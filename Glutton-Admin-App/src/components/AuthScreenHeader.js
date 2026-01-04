import { ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLOR } from '../constants/Colors'
import { backgroundImage } from '../constants/Icons'

const AuthScreenHeader = ({
    children,
}) => {
    return (
        <ImageBackground
            source={backgroundImage}
            style={styles.ImageContainer}
            resizeMode='stretch'
        >
            <StatusBar
                backgroundColor={COLOR.TRANSPARANT}
                translucent={true}
                barStyle={'light-content'}
            />

            <View style={styles.HeaderContainer}>
                <Text style={styles.HeaderText}>Glutton</Text>
            </View>

            <View style={styles.ImageContainer}>
                {children}
            </View>
        </ImageBackground>
    )
}

export default AuthScreenHeader

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: COLOR.WHITE,
    },
    ImageContainer: {
        flex: 1,
    },
    HeaderContainer: {
        height: '30%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    HeaderText: {
        color: COLOR.WHITE,
        fontSize: 35,
        fontWeight: '800',
    },
})