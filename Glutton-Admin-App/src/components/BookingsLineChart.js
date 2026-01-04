import { StyleSheet, View } from 'react-native'
import React from 'react'
import { VictoryChart, VictoryLabel, VictoryAxis, VictoryLine, } from 'victory-native';
import { Screen_Width } from '../constants/Constants';
import { getMaxTotalValue } from '../constants/VictoryChart';
import { COLOR } from '../constants/Colors';
import { Elevation_2 } from '../constants/Elevation';

const ChartWidth = Screen_Width - 20;

const BookingsLineChart = ({
    title,
    fromDate,
    toDate,
    data,
}) => {
    return (
        <View style={[styles.Container, Elevation_2]} >
            <VictoryChart
                height={ChartWidth * 0.65}
                horizontal={false}
                domainPadding={{ x: [8, 8], y: [0, 8] }}
                width={ChartWidth}
            >
                {
                    title &&
                    <VictoryLabel
                        text={`${title}'s Bookings`}
                        x={ChartWidth * 0.5}
                        y={27}
                        textAnchor="middle"
                        style={{
                            fontSize: 13,
                            fontWeight: '600',
                            fill: COLOR.GRAY,
                        }}
                    />
                }
                <VictoryAxis
                    horizontal
                    animate={false}
                    tickValues={[new Date(fromDate), new Date(toDate)]}
                    tickFormat={t => new Date(t).toLocaleDateString()}
                    style={{
                        grid: { stroke: 'gray', strokeDasharray: '2', strokeWidth: 0 },
                        axisLabel: { padding: 35, fill: COLOR.GRAY, fontSize: 11, },
                        ticks: { stroke: COLOR.BLACK, size: 5 },
                        tickLabels: { fill: COLOR.BLACK60, fontSize: 12, }
                    }}
                />
                <VictoryAxis
                    dependentAxis
                    tickFormat={(tick) => Math.round(tick)}
                    tickValues={getMaxTotalValue(data) > 5 ? undefined : [1, 2, 3, 4, 5]}
                    animate={false}
                    style={{
                        grid: { stroke: 'gray', strokeDasharray: '2', strokeWidth: 0.2 },
                        axisLabel: { padding: 30, fill: COLOR.GRAY, fontSize: 11, },
                        ticks: { stroke: COLOR.BLACK, size: 5 },
                        tickLabels: { fill: COLOR.BLACK60, fontSize: 12, }
                    }}
                />
                <VictoryLine
                    style={{ data: { stroke: COLOR.GRAPHYELLOW, strokeWidth: 1 } }}
                    data={data} x="date" y="total"
                    interpolation="linear"
                />
                <VictoryLine
                    style={{ data: { stroke: COLOR.GRAPHGREEN, strokeWidth: 1 } }}
                    data={data} x="date" y="verify"
                    interpolation="linear"
                />
                <VictoryLine
                    style={{ data: { stroke: COLOR.GRAPHRED, strokeWidth: 1 } }}
                    data={data} x="date" y="cancel"
                    interpolation="linear"
                />
            </VictoryChart>
        </View>
    )
}

export default BookingsLineChart

const styles = StyleSheet.create({
    Container: {
        backgroundColor: COLOR.WHITE,
        width: '100%',
        alignItems: 'center',
        marginTop: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.BORDERCOLOR,
    },
})