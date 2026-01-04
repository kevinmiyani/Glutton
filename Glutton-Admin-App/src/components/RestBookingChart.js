import { StyleSheet, View } from 'react-native'
import React from 'react'
import { VictoryBar, VictoryChart, VictoryGroup, VictoryLabel, VictoryAxis, } from 'victory-native';
import { getMaxYValue } from '../constants/VictoryChart';
import { Screen_Width } from '../constants/Constants';
import { NavigationScreens } from '../constants/Strings';
import { Elevation_2 } from '../constants/Elevation';
import LinkButton from './buttons/LinkButton';
import { COLOR } from '../constants/Colors';
import ChartNotationLabel from './labels/ChartNotationLabel';

const RestBookingChart = ({
    tdata,
    vdata,
    cdata,
    navigation,
    restId,
    startDate,
    restName
}) => {
    return (
        <View
            style={[styles.Container, Elevation_2]}
        >
            <VictoryChart
                height={Screen_Width * 0.6}
                horizontal={false}
                width={Screen_Width}
                domainPadding={{ x: [20, 8], y: [0, 8] }}
            >
                <VictoryLabel
                    text="Last Week Bookings"
                    x={Screen_Width * 0.5}
                    y={25}
                    textAnchor="middle"
                    style={{
                        fontSize: 13,
                        fill: COLOR.GRAY
                    }}
                />
                <VictoryAxis
                    horizontal
                    animate={false}
                    label="Week Days"
                    style={{
                        grid: { stroke: 'gray', strokeDasharray: '2', strokeWidth: 0 },
                        axisLabel: { padding: 35, fill: COLOR.GRAY, fontSize: 11, },
                        ticks: { stroke: COLOR.BLACK, size: 5 },
                        tickLabels: { fill: COLOR.BLACK60, fontSize: 12, }
                    }}
                />
                <VictoryAxis
                    dependentAxis
                    animate={false}
                    style={{
                        grid: { stroke: 'gray', strokeDasharray: '2', strokeWidth: 0.2 },
                        axisLabel: { padding: 30, fill: COLOR.GRAY, fontSize: 11, },
                        ticks: { stroke: COLOR.BLACK, size: 5 },
                        tickLabels: { fill: COLOR.BLACK60, fontSize: 12, }
                    }}
                    tickFormat={(tick) => Math.round(tick)}
                    tickValues={getMaxYValue(tdata) > 5 ? undefined : [1, 2, 3, 4, 5]}
                />

                <VictoryGroup
                    offset={10}
                    animate={{
                        duration: 2000,
                    }}
                    colorScale={[COLOR.GRAPHGREEN, COLOR.GRAPHRED, COLOR.GRAPHYELLOW]}
                >
                    <VictoryBar
                        data={vdata}
                        barWidth={8}
                    />
                    <VictoryBar
                        data={cdata}
                        barWidth={8}
                    />
                    <VictoryBar
                        data={tdata}
                        barWidth={8}
                    />
                </VictoryGroup>
            </VictoryChart>

            <View
                style={styles.NotationContainer}
            >
                <ChartNotationLabel
                    label={'Verified'}
                    iconColor={COLOR.GRAPHGREEN}
                    marginTop={0}
                />
                <ChartNotationLabel
                    label={'Cancelled'}
                    iconColor={COLOR.GRAPHRED}
                    marginTop={0}
                />
                <ChartNotationLabel
                    label={'Total'}
                    iconColor={COLOR.GRAPHYELLOW}
                    marginTop={0}
                />
            </View>

            <LinkButton
                label={'See All Bookings'}
                onPress={() => {
                    navigation.navigate(NavigationScreens.BookingsScreen, { restId: restId, startDate: startDate, restName: restName })
                }}
            />
        </View>
    )
}

export default RestBookingChart

const styles = StyleSheet.create({
    Container: {
        backgroundColor: COLOR.WHITE,
        width: '100%',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.BORDERCOLOR,
        padding: 10,
    },
    NotationContainer: {
        justifyContent: 'center',
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
    },
})