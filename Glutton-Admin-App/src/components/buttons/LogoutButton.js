import { Alert, Image, StyleSheet, TouchableOpacity, } from 'react-native'
import React from 'react'
import { logoutIcon } from '../../constants/Icons';
import { NavigationScreens } from '../../constants/Strings';
import auth from '@react-native-firebase/auth'
import { COLOR } from '../../constants/Colors';
import { removeAuthID } from '../../constants/AsyncStorage';
import { navigationToReset } from '../../constants/NavigationController';

const LogoutButton = ({ navigation, isDisable = true }) => {

    const Logout = async () => {
        Alert.alert(
            'Logout',
            'Are you sure, you want to logout ?',
            [
                { text: 'No', onPress: () => { } },
                {
                    text: 'Yes', onPress: async () => {
                        await removeAuthID();
                        auth().signOut().then(navigationToReset(navigation, NavigationScreens.LoginScreen))
                    }
                },

            ],
        )

    }
    return (
        <TouchableOpacity
            onPress={Logout}
            style={[styles.Button, isDisable && { backgroundColor: COLOR.TRANSPARANT, borderColor: COLOR.TRANSPARANT }]}
            disabled={isDisable}
        >
            <Image
                style={[styles.LogoutIcon,
                isDisable && { tintColor: COLOR.TRANSPARANT }]}
                source={logoutIcon}
            />
        </TouchableOpacity>
    )
}

export default LogoutButton

const styles = StyleSheet.create({
    Button: {
        marginRight: 18,
        height: '50%',
        aspectRatio: 1 / 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR.BLACK,
        padding: 5,
        borderRadius: 100,
    },
    LogoutIcon: {
        resizeMode: 'contain',
        height: '100%',
        width: '100%',
        tintColor: COLOR.WHITE,
        left: -0.6,
    },
})