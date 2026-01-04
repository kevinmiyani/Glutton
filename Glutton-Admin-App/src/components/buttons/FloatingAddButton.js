import { StyleSheet, TouchableOpacity, } from 'react-native'
import React from 'react'
import { COLOR, GRADIENTCOLOR } from '../../constants/Colors'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Screen_Width } from '../../constants/Constants';
import LinearGradient from 'react-native-linear-gradient';
import { Elevation_10 } from '../../constants/Elevation';

const FloatingAddButton = ({
    onPress,
}) => {
    return (
        <TouchableOpacity
            style={[styles.ButtonContainer, Elevation_10]}
            onPress={onPress}
        >
            <LinearGradient
                colors={GRADIENTCOLOR.BLACK_50_100_100_100}
                useAngle angle={150}
                style={styles.Gradient}
            >
                <FontAwesome5 name='plus' size={15} color={COLOR.WHITE} />
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default FloatingAddButton

const styles = StyleSheet.create({
    ButtonContainer: {
        width: Screen_Width * 0.15,
        aspectRatio: 1 / 1,
        position: 'absolute',
        backgroundColor: COLOR.WHITE,
        borderRadius: 50,
        right: 30,
        bottom: 30,
    },
    Gradient: {
        width: '100%',
        aspectRatio: 1 / 1,
        borderRadius: Screen_Width * 0.15,
        alignItems: 'center',
        justifyContent: 'center',
    },
})