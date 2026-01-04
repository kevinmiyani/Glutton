import { StyleSheet, View, } from 'react-native'
import React from 'react'
import { VictoryBar, VictoryChart, VictoryGroup, VictoryLabel, VictoryAxis, } from 'victory-native';
import { Screen_Width } from '../constants/Constants';
import { Elevation_2 } from '../constants/Elevation';
import LinkButton from './buttons/LinkButton';
import { NavigationScreens } from '../constants/Strings';
import { COLOR } from '../constants/Colors';

const RatingChart = ({
    data,
    restId,
    navigation,
    ratingData,
}) => {
    return (
        <View
            style={[styles.Container, Elevation_2]}
        >
            <VictoryChart
                height={Screen_Width * 0.5}
                width={Screen_Width}
            >
                <VictoryLabel
                    text="Ratings"
                    x={(Screen_Width * 0.5) - 3}
                    y={25}
                    textAnchor="middle"
                    style={{
                        fontSize: 13,
                        fill: COLOR.BLACK60,
                    }}
                />
                <VictoryAxis
                    horizontal
                    tickValues={[1, 2, 3, 4, 5]}
                    animate={false}
                    style={{
                        grid: { stroke: 'gray', strokeDasharray: '2', strokeWidth: 0 },
                        axisLabel: { padding: 35, fill: COLOR.GRAY, fontSize: 11, },
                        tickLabels: { fill: COLOR.BLACK, fontSize: 12, },
                        axis: { stroke: 'none' },
                    }}
                />
                <VictoryAxis
                    dependentAxis
                    tickValues={[]}
                    animate={false}
                    style={{
                        grid: { stroke: 'gray', strokeDasharray: '2', strokeWidth: 0 },
                        tickLabels: { fill: COLOR.BLACK60, fontSize: 0, },
                        axis: { stroke: 'none' },
                    }}
                />
                <VictoryGroup
                    animate={{
                        duration: 2000,
                    }}
                    colorScale={[COLOR.GRAPHYELLOW]}
                >
                    <VictoryBar
                        data={data}
                        barWidth={10}
                        cornerRadius={{ top: 5, bottom: 5 }}
                        labels={({ datum }) => `${datum.y}`}
                        labelComponent={<VictoryLabel dx={5} style={{ fontSize: 11, fill: COLOR.GRAY }} />}
                    />
                </VictoryGroup>
            </VictoryChart>

            <View style={{
                top: -20,
            }}>
                <LinkButton
                    label={'See All'}
                    onPress={() => {
                        navigation.navigate(NavigationScreens.CustomerReviewsScreen, {
                            data: ratingData,
                        })
                    }}
                />
            </View>
        </View>
    )
}

export default RatingChart

const styles = StyleSheet.create({
    Container: {
        backgroundColor: COLOR.WHITE,
        width: '100%',
        shadowRadius: 2,
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.BORDERCOLOR,
    },
})