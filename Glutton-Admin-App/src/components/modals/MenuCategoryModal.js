import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import { Elevation_10, Elevation_5 } from '../../constants/Elevation'
import { COLOR, GRADIENTCOLOR } from '../../constants/Colors'
import LinearGradient from 'react-native-linear-gradient'

const MenuCategoryModal = ({
    onSubmit,
    onClose,
    image,
    catName,
    fontColor,
    loading,
    isUpdate,
}) => {
    return (
        <View
            style={[styles.ImageContainer, Elevation_5]}
        >
            <FastImage
                source={{ uri: image }}
                style={styles.Image}
                resizeMode='cover'
            />
            <View style={{
                alignItems: 'center',
            }}>
                <Text style={[styles.CatName, { color: fontColor }]} numberOfLines={1}>{catName}</Text>
                <Text style={{ color: fontColor, fontSize: 13, marginTop: 25, fontWeight: '600', }} numberOfLines={1}>Font Color</Text>
                <Text style={{ color: fontColor, fontSize: 12, marginTop: 5, fontWeight: '800', }} numberOfLines={1}>{fontColor}</Text>
            </View>
            {
                loading ?
                    <View
                        style={styles.ProgressContainer}
                        angle={110}
                        useAngle
                    >
                        <ActivityIndicator size={'small'} color={COLOR.BLACK} />
                        <Text style={styles.ProgressText}
                            numberOfLines={1}
                        >
                            {isUpdate ? 'Updating...' : 'Adding New Category...'}
                        </Text>
                    </View>
                    :
                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity
                            onPress={onSubmit}
                            style={[styles.Button, Elevation_10, { shadowColor: COLOR.ORANGE }]}
                        >
                            <LinearGradient
                                colors={GRADIENTCOLOR.ORANGE_100_100}
                                style={styles.ButtonGradient}
                                angle={110}
                                useAngle
                            >
                                <Text style={styles.ButtonText}>{isUpdate ? 'Update' : 'Add'}</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <View style={{ width: 10, }} />

                        <TouchableOpacity
                            onPress={onClose}
                            style={[styles.Button, Elevation_10]}
                        >
                            <LinearGradient
                                colors={GRADIENTCOLOR.BLACK_50_100_100_100}
                                style={styles.ButtonGradient}
                                angle={140}
                                useAngle
                            >
                                <Text style={[styles.ButtonText]}>Close</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
            }
        </View>
    )
}

export default MenuCategoryModal

const styles = StyleSheet.create({
    ImageContainer: {
        width: '100%',
        aspectRatio: 1 / 1.77777778,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR.WHITE,
    },
    Image: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
        position: 'absolute',
        borderWidth: 1,
        borderColor: COLOR.BORDERCOLOR,
        zIndex: -10,
    },
    CatName: {
        fontSize: 20,
        paddingHorizontal: 30,
        fontWeight: '800',
    },
    ButtonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: 15,
        position: 'absolute',
        paddingHorizontal: 15,
    },
    ButtonGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        borderRadius: 15,
        width: '100%',
    },
    Button: {
        height: 40,
        borderRadius: 15,
        elevation: 5,
        shadowOffset: { height: 5, width: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        backgroundColor: COLOR.WHITE,
        flex: 1,
        justifyContent: 'center',
    },
    ButtonText: {
        color: COLOR.WHITE,
        alignSelf: 'center',
        fontWeight: '700',
        fontSize: 13,
    },
    ProgressContainer: {
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 50,
        backgroundColor: COLOR.BORDERCOLOR,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
    },
    ProgressText: {
        fontSize: 13,
        color: COLOR.BLACK,
        marginLeft: 10,
        maxWidth: '80%',
        fontWeight: '700',
    },
})