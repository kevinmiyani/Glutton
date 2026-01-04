import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { TextInput } from 'react-native-gesture-handler'
import { COLOR, GRADIENTCOLOR } from '../../constants/Colors'
import { Elevation_10 } from '../../constants/Elevation'

const AddNewPackageModal = ({
    packageName,
    setPackageName,
    duration,
    setDuration,
    price,
    setPrice,
    onSubmit,
    onClose,
    upload,
}) => {
    return (
        <View style={styles.Container}>
            <View style={styles.ContentContainer}>
                <LinearGradient
                    colors={GRADIENTCOLOR.BLACK_50_100_100_100}
                    style={styles.HeaderContainer}
                    angle={160}
                    useAngle
                >
                    <Text style={styles.HeaderText}
                        numberOfLines={1}
                    >
                        Add New Package
                    </Text>
                </LinearGradient>

                <TextInput
                    style={[styles.InputBox,]}
                    placeholder={'Package Name'}
                    placeholderTextColor={COLOR.GRAY}
                    numberOfLines={1}
                    keyboardType={'default'}
                    value={packageName}
                    onChangeText={setPackageName}
                />

                <TextInput
                    style={[styles.InputBox,]}
                    placeholder={'Price (Rs.)'}
                    placeholderTextColor={COLOR.GRAY}
                    numberOfLines={1}
                    keyboardType={'numeric'}
                    value={price}
                    maxLength={4}
                    onChangeText={setPrice}
                />

                <TextInput
                    style={[styles.InputBox,]}
                    placeholder={'Duration (Months)'}
                    placeholderTextColor={COLOR.GRAY}
                    numberOfLines={1}
                    keyboardType={'numeric'}
                    value={duration}
                    maxLength={4}
                    onChangeText={setDuration}
                />

                {
                    upload ?
                        <View
                            style={styles.UploadingContainer}
                        >
                            <ActivityIndicator size={'small'} color={COLOR.BLACK} />
                            <Text style={styles.UploadingText}
                                numberOfLines={1}
                            >
                                Package Adding...
                            </Text>
                        </View>
                        :
                        <View
                            style={styles.ButtonContainer}
                        >
                            <TouchableOpacity
                                onPress={onSubmit}
                                style={[styles.ButtonDialog, Elevation_10, {
                                    shadowColor: COLOR.ORANGE,
                                }]}
                            >
                                <LinearGradient
                                    colors={GRADIENTCOLOR.ORANGE_100_100}
                                    style={styles.ButtonGradient}
                                    angle={90}
                                    useAngle
                                >
                                    <Text style={styles.ButtonDialogText}>Add</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <View style={{ width: 10 }} />
                            <TouchableOpacity
                                onPress={onClose}
                                style={[styles.ButtonDialog, Elevation_10]}
                            >
                                <LinearGradient
                                    colors={GRADIENTCOLOR.BLACK_50_100_100_100}
                                    style={styles.ButtonGradient}
                                    angle={160}
                                    useAngle
                                >
                                    <Text style={styles.ButtonDialogText}>Close</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                }
            </View>
        </View>
    )
}

export default AddNewPackageModal

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLOR.BLACK30,
        padding: 40,
    },
    ContentContainer: {
        width: '100%',
        backgroundColor: COLOR.WHITE,
        borderRadius: 20,
        padding: 20,
    },
    HeaderContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 17,
        height: 40,
        marginBottom: 10,
    },
    HeaderText: {
        fontSize: 13,
        color: COLOR.WHITE,
        fontWeight: 'bold',
        padding: 10,
        paddingHorizontal: 15,
    },
    ButtonDialog: {
        height: 40,
        borderRadius: 17,
        flex: 1,
        backgroundColor: COLOR.WHITE,
    },
    ButtonGradient: {
        alignItems: 'center',
        borderRadius: 17,
        borderColor: COLOR.BORDERCOLOR,
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
    },
    ButtonDialogText: {
        color: COLOR.WHITE,
        flex: 1,
        textAlign: 'center',
        fontSize: 13,
    },
    InputBox: {
        borderRadius: 12,
        height: 40,
        marginTop: 10,
        paddingHorizontal: 15,
        color: COLOR.BLACK,
        fontSize: 12,
        backgroundColor: COLOR.BORDERCOLOR,
    },
    ButtonContainer: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 15,
    },
    UploadingContainer: {
        padding: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 15,
        borderRadius: 17,
        height: 40,
        paddingHorizontal: 15,
        backgroundColor: COLOR.BORDERCOLOR,
    },
    UploadingText: {
        fontSize: 12,
        color: COLOR.BLACK,
        marginLeft: 10,
    },
})