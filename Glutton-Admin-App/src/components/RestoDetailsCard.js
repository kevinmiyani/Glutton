import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import TitleValuePairLabel from './labels/TitleValuePairLabel';
import { COLOR, GRADIENTCOLOR } from '../constants/Colors';
import { Elevation_2 } from '../constants/Elevation';

const RestoDetailsCard = ({
    data,
}) => {

    const title = data.title;
    const restData = data.data;

    return (
        <View
            style={styles.Container}
        >
            <View
                style={[styles.ContentContainer, Elevation_2]}
            >
                {
                    restData.map((item, i) => {
                        return (
                            <TitleValuePairLabel
                                title={item.title}
                                value={item.value}
                                values={item.values}
                                key={i}
                            />
                        )
                    })}
            </View>

            <LinearGradient
                colors={GRADIENTCOLOR.BLACK_50_100_100_100}
                style={styles.TitleContainer}
                angle={150}
                useAngle
            >
                <Text style={styles.TitleText} numberOfLines={1}>{title}</Text>
            </LinearGradient>
        </View>
    )
}

export default RestoDetailsCard

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        marginTop: 15,
    },
    ContentContainer: {
        width: '100%',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.BORDERCOLOR,
        marginTop: 12,
        backgroundColor: COLOR.WHITE,
        paddingTop: 15,
    },
    TitleContainer: {
        backgroundColor: COLOR.WHITE,
        borderRadius: 10,
        top: 0,
        left: 20,
        position: 'absolute',
    },
    TitleText: {
        color: COLOR.WHITE,
        fontSize: 14,
        paddingVertical: 5,
        paddingHorizontal: 30,
    },
})