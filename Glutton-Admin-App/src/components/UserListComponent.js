import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOR, GRADIENTCOLOR } from '../constants/Colors'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Elevation_2 } from '../constants/Elevation'

const UserListComponent = ({
    Views,
    item,
    onPress,
    authTypes,
}) => {
    const icon = authTypes[authTypes.findIndex((i) => i.type.toLowerCase() == item?.authType?.toLowerCase())].icon;
    return (
        <View style={styles.Container}>
            <View
                style={[styles.View1, {
                    width: Views[0].width,
                }]}
            >
                {
                    item?.userImg ?
                        <FastImage
                            source={{ uri: item?.userImg }}
                            style={styles.ProfileImage} />
                        :
                        <LinearGradient
                            colors={GRADIENTCOLOR.ORANGE_100_100}
                            style={styles.ProfileImage}
                            angle={160}
                            useAngle
                        >
                            <Text style={styles.ProfileIconChar}>{item?.userName ? item?.userName.charAt(0) : 'G'}</Text>
                        </LinearGradient>
                }

                <Text
                    style={styles.UserNameText}
                    numberOfLines={1}
                >
                    {item?.userName ? item?.userName : 'Glutton User'}
                </Text>
            </View>

            <View
                style={[styles.View2, {
                    width: Views[1].width,
                }]}
            >
                <Text
                    style={styles.ContactText}
                    numberOfLines={1}>
                    {item?.authType == 'phone' ? '+91 ' + item?.contactNo : item?.email}
                </Text>
            </View>

            <View
                style={[styles.View3, {
                    width: Views[2].width,
                }]}
            >
                <FastImage
                    source={icon}
                    style={styles.TypeIcon} />
            </View>

            <View
                style={[styles.View4, {
                    width: Views[3].width,
                }]}
            >
                <TouchableOpacity style={[styles.ViewProfileButton, Elevation_2]}
                    onPress={() => { onPress({ ...item, icon }) }}
                >
                    <Ionicons name='eye' size={15} color={COLOR.BLACK} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default UserListComponent

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: COLOR.BORDERCOLOR,
    },

    View1: {
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5,
    },
    ProfileImage: {
        height: 30,
        aspectRatio: 1 / 1,
        borderRadius: 50,
        borderColor: COLOR.BORDERCOLOR,
        borderWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ProfileIconChar: {
        fontSize: 15,
        color: COLOR.WHITE,
        fontWeight: 'bold',
    },
    UserNameText: {
        flex: 1,
        color: COLOR.BLACK,
        fontSize: 12,
        marginLeft: 10,
    },

    View2: {
        padding: 5,
        justifyContent: 'center',
    },
    ContactText: {
        color: COLOR.BLACK,
        fontSize: 12,
    },

    View3: {
        padding: 14,
        aspectRatio: 1 / 1,
    },
    TypeIcon: {
        width: '100%',
        height: '100%',
    },

    View4: {
        aspectRatio: 1 / 1,
        padding: 5,
    },
    ViewProfileButton: {
        flex: 1,
        backgroundColor: 'rgba(243,244,246,1)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
})