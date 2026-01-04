import { StyleSheet, View, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { VictoryArea, VictoryChart, VictoryLabel, VictoryAxis, } from 'victory-native';
import { eachDayOfInterval, format, subDays } from 'date-fns';
import { getMaxYValue } from '../../constants/VictoryChart';
import { Screen_Width } from '../../constants/Constants';
import { COLOR } from '../../constants/Colors';
import { Elevation_2 } from '../../constants/Elevation';

const ChartWidth = Screen_Width - 30;

const BookingChart = ({ bookingData }) => {

  const [data, setData] = useState([]);

  const DayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',]

  const dates = eachDayOfInterval(
    {
      start: subDays(new Date(), 6),
      end: new Date(),
    },
    {
      weekStartsOn: 1,
    }
  );

  useEffect(() => {
    bookingData && bookingData.length > 0 && DataProcess();
  }, [bookingData])

  const DataProcess = () => {
    let dataList = [];
    dates.map((date, i) => {
      const x = DayOfWeek[date.getDay()];
      const y = bookingData.filter((i) => i?.booking?.date == format(new Date(date), 'yyyy-MM-dd')).length;
      dataList.push({ x, y });
    })
    setData(dataList);
  }
  return (
    <View
      style={[styles.Container, Elevation_2]}
    >
      <VictoryChart
        animate={{
          duration: 2000,
        }}
        height={ChartWidth * 0.65}
        horizontal={false}
        width={ChartWidth}
        style={{
          parent: {
            left: 11,
          }
        }}
        domainPadding={{ x: [10, 8], y: [0, 8] }}
      >
        <VictoryLabel
          text="Last 1 Week Bookings"
          x={ChartWidth * 0.5}
          y={20}
          textAnchor="middle"
          style={{
            fontSize: 13,
            fill: COLOR.BLACK60,
          }}
        />
        <VictoryAxis
          horizontal
          label="Week Days"
          animate={false}
          style={{
            grid: { stroke: 'gray', strokeDasharray: '2', strokeWidth: 0 },
            axisLabel: { padding: 35, fill: COLOR.GRAY, fontSize: 11, },
            tickLabels: { fill: COLOR.BLACK60, fontSize: 12, },
            ticks: { stroke: COLOR.BLACK, size: 5 },
          }}
        />
        <VictoryAxis
          dependentAxis
          label="No. of Bookings"
          animate={false}
          tickFormat={(tick) => Math.round(tick)}
          tickValues={getMaxYValue(data) > 5 ? undefined : [1, 2, 3, 4, 5]}
          style={{
            grid: { stroke: 'gray', strokeDasharray: '2', strokeWidth: 0.2 },
            axisLabel: { padding: 33, fill: COLOR.GRAY, fontSize: 11, },
            tickLabels: { fill: COLOR.BLACK60, fontSize: 12, },
            ticks: { stroke: COLOR.BLACK, size: 5 },
          }}
        />
        <VictoryArea
          style={{ data: { fill: COLOR.AREAGRAPH, fillOpacity: 0.3, stroke: COLOR.AREAGRAPH, strokeWidth: 1 } }}
          data={data}
          interpolation="cardinal"
          padding={{ top: 20 }}
        />
      </VictoryChart>
    </View>

  )
}

export default BookingChart

const styles = StyleSheet.create({
  Container: {
    backgroundColor: COLOR.WHITE,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 15,
    borderWidth: 1.5,
    padding: 10,
    borderColor: COLOR.BORDERCOLOR,
  },
})