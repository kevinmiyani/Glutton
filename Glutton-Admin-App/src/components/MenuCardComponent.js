import { StyleSheet, Text, TouchableOpacity, } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import Feather from 'react-native-vector-icons/Feather';
import { Screen_Width } from '../constants/Constants'

const MenuCardComponent = ({
    data,
    onPress,
}) => {
    return (
        <TouchableOpacity
            style={styles.Container}
            onPress={onPress}
            activeOpacity={1}
        >
            <FastImage
                source={{ uri: data?.img }}
                style={styles.Image}
            />
            <Text style={[styles.Name, { color: data?.fontColor, }]}>{data?.name}</Text>
            <Feather name='edit-3' size={20} color={data?.fontColor} />
        </TouchableOpacity>
    )
}

export default MenuCardComponent

const styles = StyleSheet.create({
    Container: {
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: (Screen_Width * 0.5) - 15,
        aspectRatio: 1 / 1.77777778,
        marginBottom: 10,
        marginHorizontal: 5,
    },
    Image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        position: 'absolute',
        zIndex: -10,
    },
    Name: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 5,
    }
})