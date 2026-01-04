import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import React, { useState, useRef, } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import { NormalSnackBar } from '../constants/SnackBars';
import { NavigationScreens } from '../constants/Strings';
import { Elevation_5 } from '../constants/Elevation';
import { COLOR, GRADIENTCOLOR } from '../constants/Colors';
import AuthScreenHeader from '../components/AuthScreenHeader';
import { checkUserByUIDAPI } from '../api/utils';
import { storeAuthID } from '../constants/AsyncStorage';
import { setAuthIDInRedux } from '../redux/Authentication/AuthAction';
import { navigationToReset } from '../constants/NavigationController';
import { useDispatch } from 'react-redux';

const LoginScreen = ({ navigation }) => {

  const dispatch = useDispatch();

  const [viewPass, setViewPass] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validEmail = new RegExp('^[a-z0-9]+@gmail.com$');

  const _email = useRef();
  const [isEmailFocused, setIsEmailFocused] = useState(_email.current?.isFocused());

  const _password = useRef();
  const [isPasswordFocused, setIsPasswordFocused] = useState(_password.current?.isFocused());

  const [loading, setLoading] = useState(false);

  const loginUser = async () => {
    try {
      setLoading(true);
      auth()
        .signInWithEmailAndPassword(email.trim(), password.trim())
        .then(async (res) => {
          const uid = res.user.uid;
          const user = await checkUserByUIDAPI(uid);
          setLoading(false);
          if (user?.data) {
            if (user?.data?.data) {
              const type = user.data.data;
              if (type == 'Admin') {
                await storeAuthID(uid);
                dispatch(setAuthIDInRedux(uid));
                navigationToReset(navigation, NavigationScreens.HomeScreen);
              } else {
                auth().signOut();
                NormalSnackBar(`This email is register as Glutton ${type}`);
              }
            }
          } else {
            setLoading(false);
            NormalSnackBar('Something wents wrong.');
          }
        })
        .catch((e) => {
          console.log(e);
          if (e.code == 'auth/user-not-found') {
            NormalSnackBar('This email not register with Glutton.');
            setLoading(false);
          }
          if (e.code == 'auth/wrong-password') {
            NormalSnackBar('Incorrect Password');
            setLoading(false);
          }
          if (e.code == 'auth/too-many-requests') {
            NormalSnackBar('Please try sometimes later.');
            setLoading(false);
          }
        })
    } catch (e) { console.log(e) }
  }

  return (
    <AuthScreenHeader>
      <View style={{
        alignItems: 'center',
      }}>
        <Text style={{ color: COLOR.BLACK, fontSize: 30, letterSpacing: 0.5, marginTop: 90, fontWeight: '700', }}>Login</Text>
        <Text style={{ color: COLOR.BLACK60, fontSize: 13, marginTop: 5, fontWeight: '600', }}>Welcome Back Admin</Text>

        <View
          style={{
            marginTop: 50,
            width: '100%',
            paddingHorizontal: 30,
          }}
        >

          {/* Email */}
          <TextInput
            style={{
              borderBottomWidth: isEmailFocused ? 1.5 : 0.5,
              borderColor: isEmailFocused ? COLOR.ORANGE : COLOR.GRAY,
              height: 45,
              marginTop: 10,
              paddingHorizontal: 10,
              color: COLOR.BLACK,
            }}
            ref={_email}
            placeholder={'Email'}
            placeholderTextColor={COLOR.GRAY}
            numberOfLines={1}
            keyboardType={'email-address'}
            value={email}
            onChangeText={(text) => { setEmail(text) }}
            onFocus={() => { setIsEmailFocused(_email.current?.isFocused()) }}
            onBlur={() => { setIsEmailFocused(_email.current?.isFocused()) }}
            onSubmitEditing={() => { _password.current?.focus() }}
          />

          {/* Password */}
          <View style={{
            borderBottomWidth: isPasswordFocused ? 1.5 : 0.5,
            borderColor: isPasswordFocused ? COLOR.ORANGE : COLOR.GRAY,
            height: 45,
            marginTop: 10,
            flexDirection: 'row',
          }}>
            <TextInput
              ref={_password}
              style={{
                flex: 1,
                height: 40,
                paddingHorizontal: 10,
                color: COLOR.BLACK,
              }}
              placeholder={'Password'}
              placeholderTextColor={COLOR.GRAY}
              numberOfLines={1}
              keyboardType={'default'}
              secureTextEntry={!viewPass}
              onBlur={() => { setViewPass(false), setIsPasswordFocused(_password.current?.isFocused) }}
              value={password}
              onChangeText={(text) => { setPassword(text) }}
              onFocus={() => { setIsPasswordFocused(_password.current?.isFocused) }}
            />
            <TouchableOpacity
              style={{ padding: 15 }}
              onPress={() => { viewPass ? setViewPass(false) : setViewPass(true) }}
            >
              {
                viewPass ?
                  <Ionicons name='eye' size={17} color={isPasswordFocused ? COLOR.ORANGE : COLOR.GRAY} />
                  :
                  <Ionicons name='eye-off' size={17} color={isPasswordFocused ? COLOR.ORANGE : COLOR.GRAY} />
              }
            </TouchableOpacity>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity
            style={{
              padding: 10,
              marginTop: 5,
              alignSelf: 'flex-end',
            }}
            onPress={() => { navigation.navigate(NavigationScreens.ForgotPasswordScreen) }}
          >
            <Text style={{ color: COLOR.GRAY, fontSize: 12, fontWeight: '500', }}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          {
            loading ?
              <View style={{
                height: 40,
                marginTop: 30,
                justifyContent: 'center',
              }}>
                <ActivityIndicator size='small' color={COLOR.ORANGE} />
              </View>
              :
              <TouchableOpacity
                style={[Elevation_5, styles.Button]}
                onPress={() => {
                  if (validEmail.test(email) && password != '') {
                    loginUser()
                  } else if (!validEmail.test(email)) {
                    NormalSnackBar('Enter valid Email Address');
                  } else if (password == '') {
                    NormalSnackBar('Please Enter Password.');
                  }
                }}
              >
                <LinearGradient
                  colors={GRADIENTCOLOR.ORANGE_100_100}
                  useAngle angle={160}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: COLOR.WHITE,
                  }}
                >
                  <Text
                    style={{
                      color: COLOR.WHITE,
                      fontWeight: '700',
                    }}
                  >LogIn</Text>
                </LinearGradient>
              </TouchableOpacity>
          }
          {/* Register Button */}
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: '100%',
              alignItems: 'center',
              marginTop: 10,
            }}
          >
            <Text
              style={{
                color: COLOR.GRAY,
                fontSize: 12,
              }}
            >
              Want to become glutton admin?
            </Text>
            <TouchableOpacity
              style={{
                padding: 10,
              }}
              onPress={() => { navigation.navigate(NavigationScreens.RegisterScreen) }}
            >
              <Text
                style={{
                  color: COLOR.ORANGE,
                  fontSize: 12,
                  fontWeight: 'bold',
                }}
              >Register</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
    </AuthScreenHeader>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  Button: {
    borderRadius: 10,
    height: 40,
    marginTop: 30,
    shadowColor: COLOR.ORANGE,
  },
})