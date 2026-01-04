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
import auth from '@react-native-firebase/auth';
import { NormalSnackBar } from '../constants/SnackBars';
import { Elevation_5 } from '../constants/Elevation';
import { COLOR, GRADIENTCOLOR } from '../constants/Colors';
import AuthScreenHeader from '../components/AuthScreenHeader';

const ForgotPassword = ({ navigation }) => {

    const [email, setEmail] = useState('');

    const validEmail = new RegExp('^[a-z0-9]+@gmail.com$');

    const _email = useRef();
    const [isEmailFocused, setIsEmailFocused] = useState(_email.current?.isFocused());

    const [loading, setLoading] = useState(false);

    const sendMail = () => {
        setLoading(true);
        try {
            auth()
                .sendPasswordResetEmail(email)
                .then(() => {
                    NormalSnackBar('Mail Sended Successfully, Please check your mail.');
                    navigation.pop(1);
                })
                .catch((e) => {
                    console.log(e);
                    if (e.code == 'auth/user-not-found') {
                        NormalSnackBar('This email not register with Glutton.');
                    }
                    if (e.code == 'auth/too-many-requests') {
                        NormalSnackBar('Please try sometimes later.');
                    }
                    setLoading(false);
                })
        } catch (e) { }
    }

    return (
        <AuthScreenHeader>
            <View
                style={{
                    alignItems: 'center',
                }}
            >
                <Text style={{ color: COLOR.BLACK, fontSize: 30, letterSpacing: 0.5, marginTop: 150, fontWeight: '700', }}>Forgot Password</Text>
                <Text style={{ color: COLOR.GRAY, fontSize: 13, marginTop: 5, fontWeight: '600', }}>After sending request wait for 5 Min</Text>

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
                    />

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
                                    if (validEmail.test(email)) {
                                        sendMail()
                                    } else if (!validEmail.test(email)) {
                                        NormalSnackBar('Enter valid Email Address');
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
                                    >Send Request</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                    }
                </View>

            </View>
        </AuthScreenHeader>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({
    Button: {
        borderRadius: 10,
        height: 40,
        marginTop: 30,
        shadowColor: COLOR.ORANGE,
    },
})