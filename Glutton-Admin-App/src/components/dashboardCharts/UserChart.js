import { StyleSheet, Text, View, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { VictoryBar, VictoryChart, VictoryGroup, VictoryLabel, VictoryAxis, } from 'victory-native';
import { eachDayOfInterval, format, subDays } from 'date-fns';
import { getMaxYValue } from '../../constants/VictoryChart';
import { Screen_Width } from '../../constants/Constants';
import { COLOR } from '../../constants/Colors';
import { Elevation_10, Elevation_2 } from '../../constants/Elevation';
import { useSelector } from 'react-redux';

const ChartWidth = Screen_Width - 10;

const UserChart = () => {
    const [userList, setUserList] = useState([]);
    const [restoList, setRestoList] = useState([]);

    const startDate = subDays(new Date(), 6);
    const UserData = useSelector(state => state.UsersReducer);
    const RestoData = useSelector(state => state.RestoReducer);

    const types = [
        {
            color: COLOR.RGB.BLUE,
            title: 'Users',
        },
        {
            color: COLOR.RGB.RED,
            title: 'Restaurant',
        }
    ]

    const DayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',]

    const dates = eachDayOfInterval(
        {
            start: startDate,
            end: new Date(),
        },
        {
            weekStartsOn: 1,
        }
    );

    useEffect(() => {
        UserData && UserData?.length > 0 && UserDataProcess();
    }, [UserData])


    useEffect(() => {
        RestoData && RestoData?.length > 0 && RestoDataProcess();
    }, [RestoData])

    const UserDataProcess = () => {
        const list = UserData?.filter((user) => new Date(user?.createdAt) >= startDate).map((user) => {
            return { date: format(new Date(user?.createdAt), 'yyyy-MM-dd') };
        })

        let dataList = [];

        dates.map(date => {
            const x = DayOfWeek[date.getDay()];
            const y = list.filter((i) => i.date == format(new Date(date), 'yyyy-MM-dd')).length;
            dataList.push({ x, y });
        })

        setUserList(dataList);
    }

    const RestoDataProcess = () => {
        const list = RestoData?.filter((user) => new Date(user?.createdAt) >= startDate).map((user) => {
            return { date: format(new Date(user?.createdAt), 'yyyy-MM-dd') };
        })

        let dataList = [];

        dates.map(date => {
            const x = DayOfWeek[date.getDay()];
            const y = list.filter((i) => i.date == format(new Date(date), 'yyyy-MM-dd')).length;
            dataList.push({ x, y });
        })

        setRestoList(dataList);
    }
    return (
        <View style={[styles.Container, Elevation_2]}>
            <VictoryChart
                height={ChartWidth * 0.65}
                horizontal={false}
                width={ChartWidth}
                domainPadding={{ x: [20, 8], y: [0, 8] }}
            >

                <VictoryLabel
                    text="User and Restaurant Register in Last 1 Week"
                    x={ChartWidth * 0.5}
                    y={20}
                    textAnchor="middle"
                    style={{
                        fontSize: 13,
                        fill: COLOR.BLACK60
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
                    animate={false}
                    tickFormat={(tick) => Math.round(tick)}
                    tickValues={(
                        getMaxYValue(userList) >= getMaxYValue(restoList) ? getMaxYValue(userList) : getMaxYValue(restoList)
                    ) > 5 ? undefined : [1, 2, 3, 4, 5]}
                    style={{
                        grid: { stroke: 'gray', strokeDasharray: '2', strokeWidth: 0.2 },
                        axisLabel: { padding: 30, fill: COLOR.GRAY, fontSize: 11, },
                        ticks: { stroke: COLOR.BLACK, size: 5 },
                        tickLabels: { fill: COLOR.BLACK60, fontSize: 12, },
                    }}
                />
                <VictoryGroup
                    offset={12}
                    animate={{
                        duration: 2000,
                    }}
                    colorScale={[COLOR.RGB.BLUE, COLOR.RGB.RED]}
                >
                    {/* Users */}
                    <VictoryBar
                        data={userList}
                        barWidth={10}
                    />
                    {/* Restaurants */}
                    <VictoryBar
                        data={restoList}
                        barWidth={10}
                    />
                </VictoryGroup>
            </VictoryChart>
            <View
                style={styles.BottomLabelContainer}
            >
                {
                    types.map((type, i) =>
                        <View
                            style={styles.LabelContainer}
                            key={i}
                        >
                            <View style={[styles.Icon, Elevation_10, {
                                backgroundColor: type.color,
                                shadowColor: type.color
                            }]} />
                            <Text style={[styles.Label, { color: type.color, }]}>{type.title}</Text>
                        </View>
                    )
                }
            </View>
        </View>
    )
}

export default UserChart

const styles = StyleSheet.create({
    Container: {
        backgroundColor: COLOR.WHITE,
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 10,
        paddingTop: 10,
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderRadius: 15,
        borderWidth: 1.5,
        borderColor: COLOR.BORDERCOLOR,
    },
    BottomLabelContainer: {
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
    },
    LabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    Icon: {
        width: 15,
        height: 15,
        borderRadius: 15,
    },
    Label: {
        fontSize: 13,
        marginLeft: 5,
    }
})