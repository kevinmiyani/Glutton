import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Octicons from 'react-native-vector-icons/Octicons';
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { COLOR } from '../constants/Colors';
import { Screen_Width } from '../constants/Constants';
import { Elevation_10 } from '../constants/Elevation';

const PackageCardComponent = ({
    data,
    onPress,
    colors,
}) => {
    return (
        <View style={styles.Container}>
            <View style={[Elevation_10, styles.ContentContainer, { shadowColor: colors[1] }]}>
                <LinearGradient
                    colors={colors}
                    useAngle
                    angle={150}
                    style={styles.ContentGradient}
                >
                    <View style={{
                        flex: 1,
                        borderRadius: 15,
                        alignItems: 'center',
                        padding: 20,
                        justifyContent: 'space-evenly',
                    }}>
                        <Text style={{
                            color: COLOR.WHITE,
                            fontSize: 15,
                        }} numberOfLines={1}>
                            {data?.packageName}
                        </Text>

                        <Text style={{
                            color: COLOR.WHITE,
                            fontSize: 30,
                        }} numberOfLines={1}>
                            Rs. {data?.price && parseFloat(data?.price)?.toFixed(2)?.toString()}/-
                        </Text>

                        <Text style={{
                            color: COLOR.WHITE,
                            fontSize: 13
                        }} numberOfLines={1}>
                            Duration : {data?.duration} {data?.duration == 1 ? 'Month' : 'Months'}
                        </Text>
                    </View>
                </LinearGradient>
            </View>

            <TouchableOpacity
                style={[Elevation_10, styles.RemoveButton]}
                onPress={onPress}
            >
                <Octicons name='trash' color={COLOR.BLACK} size={20} />
            </TouchableOpacity>
        </View>
    )
}

export default PackageCardComponent

const styles = StyleSheet.create({
    Container: {
        marginBottom: 15,
        width: '100%',
        justifyContent: 'center',
    },
    ContentContainer: {
        width: '93.5%',
        aspectRatio: 2 / 1,
        borderRadius: 15,
        backgroundColor: COLOR.WHITE,
    },
    ContentGradient: {
        flex: 1,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    RemoveButton: {
        height: (Screen_Width - 60) * 0.15,
        aspectRatio: 1 / 1,
        right: 0,
        position: 'absolute',
        backgroundColor: COLOR.BORDERCOLOR,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
})