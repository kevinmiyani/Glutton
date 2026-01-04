import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOR } from '../../constants/Colors'

const LinkButton = ({
    label,
    onPress,
}) => {
    return (
        <TouchableOpacity
            style={styles.Container}
            onPress={onPress}
            disabled={!onPress}
        >
            <Text style={styles.Label}>{label}</Text>
        </TouchableOpacity>
    )
}

export default LinkButton

const styles = StyleSheet.create({
    Container: {
        padding: 5,
    },
    Label: {
        fontSize: 11,
        color: COLOR.BLACK60,
        textDecorationLine: 'underline',
    }
})