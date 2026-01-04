import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { VictoryPie, VictoryAnimation, } from 'victory-native';
import LinearGradient from 'react-native-linear-gradient';
import { useIsFocused } from '@react-navigation/native';
import { Screen_Width } from '../../constants/Constants';
import { COLOR, GRADIENTCOLOR } from '../../constants/Colors';
import ChartNotationLabel from '../labels/ChartNotationLabel';
import LinkButton from '../buttons/LinkButton';
import { Elevation_10, Elevation_2 } from '../../constants/Elevation';

const PieChart = ({
    navigation,
    data,
    label,
    navigationScreen,
    isFlip,
}) => {

    const [animate, setAnimate] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        setAnimate(isFocused)
    }, [navigation, isFocused])

    useEffect(() => {
        setAnimate(isFocused);
    }, [data])

    return (
        <View
            style={[styles.Container, isFlip && { flexDirection: 'row-reverse' }]}
        >
            <View
                style={[styles.InnerContaner, { aspectRatio: 1 / 1, }, Elevation_2]}
            >
                <VictoryAnimation
                    duration={2000}
                    data={{ animate: animate ? { d: "360" } : { d: "0" } }}
                >
                    {({ animate }) => (
                        <VictoryPie
                            data={data.dataSet}
                            endAngle={parseInt(animate.d)}
                            height={(Screen_Width * 0.5) - 30}
                            width={(Screen_Width * 0.5) - 30}
                            colorScale={data.colors}
                            padAngle={2}
                            innerRadius={57}
                            radius={80}
                            style={{
                                labels: {
                                    color: COLOR.TRANSPARANT,
                                }
                            }}
                            labels={() => null}
                            cornerRadius={5}
                        />
                    )}
                </VictoryAnimation>
                <Text
                    style={styles.LabelText}
                >{label}</Text>
            </View>
            <View style={{ width: 10, }} />
            <TouchableOpacity
                style={[styles.InnerContaner, { flex: 1, }, Elevation_2]}
                onPress={() => { navigation.navigate(navigationScreen) }}
                activeOpacity={1}
            >
                <LinearGradient
                    colors={GRADIENTCOLOR.BLACK_50_100_100_100}
                    style={[styles.HeaderView, Elevation_10]}
                    angle={160}
                    useAngle
                >
                    <Text style={styles.HeaderText}>{label}</Text>
                </LinearGradient>

                <View
                    style={styles.ContentView}
                >
                    {
                        data.dataSet.map((type, i) => {
                            return (
                                <ChartNotationLabel
                                    key={i}
                                    iconColor={data.colors[i]}
                                    label={`${data.labels[i]} (${type.y})`}
                                />
                            )
                        })
                    }
                </View>
                <LinkButton
                    label={`See All ${label}`}
                />
            </TouchableOpacity>
        </View>
    )
}

export default PieChart

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
    },
    InnerContaner: {
        backgroundColor: COLOR.WHITE,
        alignItems: 'center',
        padding: 10,
        borderRadius: 15,
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: COLOR.BORDERCOLOR,
    },
    LabelText: {
        position: 'absolute',
        color: COLOR.GRAY,
        fontSize: 13,
    },
    HeaderView: {
        width: '100%',
        backgroundColor: COLOR.WHITE,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    HeaderText: {
        color: COLOR.WHITE,
        letterSpacing: 0.1,
        fontSize: 14,
        paddingHorizontal: 10,
        paddingVertical: 6,
    },
    ContentView: {
        justifyContent: 'center',
        flex: 1,
    },
})