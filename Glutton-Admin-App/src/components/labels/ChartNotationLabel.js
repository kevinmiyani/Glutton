import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLOR } from '../../constants/Colors'
import { Elevation_10 } from '../../constants/Elevation'

const ChartNotationLabel = ({
    iconColor,
    label,
    marginTop = 10,
}) => {
    return (
        <View
            style={[styles.Container, { marginTop }]}
        >
            <View style={[styles.Icon, Elevation_10, {
                backgroundColor: iconColor,
                shadowColor: iconColor,
            }]}></View>
            <Text style={styles.LableText}>{label}</Text>
        </View>
    )
}

export default ChartNotationLabel

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    Icon: {
        width: 15,
        height: 15,
        borderRadius: 15,
    },
    LableText: {
        color: COLOR.BLACK,
        fontSize: 13,
        marginLeft: 5
    },
})