import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOR, GRADIENTCOLOR } from '../../constants/Colors'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Elevation_2, Elevation_5 } from '../../constants/Elevation'
import TitleValuePairLabel from '../labels/TitleValuePairLabel'

const UserDetailsModal = ({
    data,
    onDismiss,
}) => {
    return (
        <View style={styles.Container}>
            <View
                style={{
                    bottom: 40,
                }}
            >
                <View style={styles.ContentContainer}>
                    {/* Customer Details */}
                    <View
                        style={[styles.DetailsContainer, Elevation_2]}
                    >
                        <TitleValuePairLabel
                            title={'User Id'}
                            value={data?.uid}
                            marginTop={0}
                        />
                        <TitleValuePairLabel
                            title={'Username'}
                            value={data?.userName ? data?.userName : 'Glutton User'}
                        />

                        {
                            data?.contactNo &&
                            <TitleValuePairLabel
                                title={'Contact No.'}
                                value={`+91 ${data?.contactNo}`}
                            />
                        }

                        {
                            data?.email &&
                            <TitleValuePairLabel
                                title={'E-Mail'}
                                value={data?.email}
                            />
                        }

                        <TitleValuePairLabel
                            title={'Authentication Type'}
                            iconValue={
                                <FastImage
                                    source={data.icon}
                                    style={styles.AuthTypeIcon}
                                />
                            }
                        />
                    </View>

                    <TouchableOpacity style={styles.DismissButton}
                        onPress={() => { onDismiss(false) }}
                    >
                        <Ionicons name='close' size={20} color={COLOR.BLACK} />
                    </TouchableOpacity>
                </View>

                <View style={[styles.ProfileImageContainer, Elevation_5]}>
                    {
                        data?.userImg ?
                            <FastImage
                                source={{ uri: data?.userImg }}
                                style={styles.ProfileImage} />
                            :
                            <LinearGradient
                                colors={GRADIENTCOLOR.ORANGE_100_100}
                                style={styles.ProfileImage}
                                angle={160}
                                useAngle
                            >
                                <Text style={styles.ProfileIconChar}>{data?.userName ? data?.userName.charAt(0) : 'G'}</Text>
                            </LinearGradient>
                    }
                </View>
            </View>
        </View>
    )
}

export default UserDetailsModal

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: COLOR.BLACK30,
        padding: 20,
    },
    ContentContainer: {
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLOR.WHITE,
        borderRadius: 10,
        padding: 10,
        top: 40,
        paddingTop: 50,
    },
    DetailsContainer: {
        width: '100%',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLOR.BORDERCOLOR,
        backgroundColor: COLOR.WHITE,
    },
    AuthTypeIcon: {
        width: 20,
        aspectRatio: 1 / 1,
    },
    DismissButton: {
        alignItems: 'center',
        padding: 15,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    ProfileImageContainer: {
        top: 0,
        position: 'absolute',
        alignSelf: 'center',
        height: 80,
        aspectRatio: 1 / 1,
        backgroundColor: COLOR.WHITE,
        borderRadius: 50,
        padding: 2,
    },
    ProfileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ProfileIconChar: {
        fontSize: 30,
        color: COLOR.WHITE,
        fontWeight: 'bold',
    }
})