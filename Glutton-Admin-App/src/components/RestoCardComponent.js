import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import StarRating from './StarRating';
import { NavigationScreens } from '../constants/Strings';
import { COLOR, GRADIENTCOLOR } from '../constants/Colors';
import { Elevation_10 } from '../constants/Elevation';

const RestoCardComponent = ({
    data,
    navigation,
}) => {

    const LabelContainerColor = data?.isActive ? GRADIENTCOLOR.GREEN_100_100 : GRADIENTCOLOR.RED_100_100;

    return (
        <TouchableOpacity
            style={[styles.Container, Elevation_10]}
            activeOpacity={1}
            onPress={() => {
                navigation.navigate(NavigationScreens.RestoProfileScreen, {
                    data: data,
                });
            }}
        >
            {
                data?.restImage &&
                <FastImage
                    source={{ uri: data?.restImage }}
                    style={styles.RestoImage}
                    resizeMode='cover'
                />
            }

            <LinearGradient
                colors={GRADIENTCOLOR.BLACK_40_20}
                useAngle
                angle={90}
                style={styles.ContentContainer}
            >
                <View style={{
                    padding: 15,
                }}>
                    <Text
                        style={styles.RestoNameText}
                        numberOfLines={1}
                    >
                        {data?.restaurantName}
                    </Text>
                    <StarRating ratings={data?.rate} reviews={data?.reviews} />
                </View>
            </LinearGradient>

            <View style={[styles.LabelContainer, Elevation_10, { shadowColor: LabelContainerColor[1] }]}>
                <LinearGradient
                    colors={LabelContainerColor}
                    style={styles.LabelGradient}
                    angle={140}
                    useAngle
                >
                    <Text style={styles.LabelText}>{data?.isActive == false && 'Not '}Active</Text>
                </LinearGradient>
            </View>
        </TouchableOpacity>
    )
}

export default RestoCardComponent

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        aspectRatio: 1.75 / 1,
        borderRadius: 15,
        backgroundColor: COLOR.WHITE,
        marginTop: 10,
    },
    RestoImage: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
    },
    ContentContainer: {
        flex: 1,
        borderRadius: 7,
        borderColor: COLOR.WHITE50,
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        borderWidth: 1,
    },
    RestoNameText: {
        color: COLOR.WHITE,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    LabelContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: COLOR.WHITE,
    },
    LabelGradient: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    LabelText: {
        color: COLOR.WHITE,
        fontSize: 14,
        fontWeight: '600',
        paddingHorizontal: 15,
        paddingVertical: 5,
    }
})