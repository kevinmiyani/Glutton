import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOR } from '../constants/Colors'
import LinkButton from './buttons/LinkButton'
import { Elevation_2 } from '../constants/Elevation'

const DashboardCard = ({
    navigation,
    data,
    values,
}) => {
    return (
        <TouchableOpacity
            style={[styles.CardView, Elevation_2]}
            activeOpacity={1}
            onPress={() => { navigation.navigate(data.Screen) }}
        >
            <Text style={styles.HeaderText}>{data.title}</Text>

            <Text style={styles.NumberText}>
                {values}
            </Text>

            <LinkButton
                label={`See All ${data.title}`}
            />

            <View
                style={[styles.IconView, { backgroundColor: data.iconBackgroundColor }]}
            >
                {data.icon}
            </View>
        </TouchableOpacity>
    )
}

export default DashboardCard

const styles = StyleSheet.create({
    CardView: {
        flex: 1,
        backgroundColor: COLOR.WHITE,
        borderRadius: 10,
        borderColor: COLOR.BORDERCOLOR,
        borderWidth: 1,
        padding: 7,
    },
    HeaderText: {
        color: COLOR.GRAY,
        fontWeight: 'bold',
        letterSpacing: 0.1,
        fontSize: 14,
        padding: 5,
    },
    NumberText: {
        color: COLOR.BLACK,
        fontSize: 30,
        fontWeight: '600',
        paddingHorizontal: 5,
    },
    IconView: {
        position: 'absolute',
        padding: 7,
        right: 12,
        bottom: 12,
        borderRadius: 5,
        aspectRatio: 1 / 1,
    },
});