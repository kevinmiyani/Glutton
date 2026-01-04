import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { addDays, eachDayOfInterval, format, subDays } from 'date-fns';
import LinearGradient from 'react-native-linear-gradient'
import { useSelector } from 'react-redux';
import ScreenHeader from '../components/ScreenHeader';
import DatePicker from '../components/DatePicker';
import { COLOR, GRADIENTCOLOR } from '../constants/Colors';
import { Elevation_2 } from '../constants/Elevation';
import BookingsLineChart from '../components/BookingsLineChart';

const BookingsScreen = ({ route, navigation }) => {

    const BookingData = useSelector(state => state.BookingsReducer);
    const isAll = route.params ? false : true;
    const title = route.params?.restName;

    const [selectedFDate, setSelectedFDate] = useState(
        isAll ?
            format(subDays(new Date(), 6), 'yyyy-MM-dd').toString()
            :
            route.params.startDate < format(subDays(new Date(), 6), 'yyyy-MM-dd').toString()
                ?
                format(subDays(new Date(), 6), 'yyyy-MM-dd').toString()
                :
                route.params.startDate
    );

    const [selectedTDate, setSelectedTDate] = useState(format(new Date(), 'yyyy-MM-dd').toString());

    const [bookingsForTable, setBookingsForTable] = useState([]);

    const [loading, setLoading] = useState(false);

    const [list, setList] = useState([]);
    const [dates, setDates] = useState(
        eachDayOfInterval(
            {
                start: selectedFDate,
                end: selectedTDate,
            },
            {
                weekStartsOn: 1,
            })
    );

    useEffect(() => {
        setTimeout(() => {
            let temp = [];

            const bookinglist = isAll ? BookingData : BookingData.filter((i) => i?.restaurant?.uid == route.params.restId);

            bookinglist.forEach(doc => {
                const date = doc?.booking?.date;
                let status = '';
                if (doc?.isVerify == true) {
                    status = 'Verified';
                } else if (doc?.isCancel == true) {
                    status = 'Cancelled';
                } else if (doc?.isVerify == false && doc?.isCancel == false) {
                    status = 'No Verified';
                }
                temp.push({ date, status });
            })
            setList(temp);
        }, 100);
    }, [BookingData])

    useEffect(() => {
        setLoading(true);
        DataProcess(list);
    }, [list, dates])

    const DataProcess = (list) => {
        let dataList = [];
        dates.forEach(d => {
            const date = d;
            if (list.findIndex((i) => i.date == format(new Date(d), 'yyyy-MM-dd')) >= 0) {
                const dateData = list.filter((i) => i.date == format(new Date(d), 'yyyy-MM-dd'));
                const total = dateData.length;
                const verify = dateData.filter((i) => i.status == 'Verified').length;
                const cancel = dateData.filter((i) => i.status == 'Cancelled').length;
                dataList.push({ date, total, verify, cancel });
            } else {
                dataList.push({ date, total: 0, verify: 0, cancel: 0 });
            }
        })
        FilterData(dataList);
        setLoading(false);
    }

    const handleFromDateConfirm = (date) => {
        if (selectedTDate != date && selectedFDate != date) {
            setSelectedFDate(date);
            setDates(eachDayOfInterval(
                {
                    start: new Date(date),
                    end: selectedTDate,
                },
                {
                    weekStartsOn: 1,
                }))
        }
    };

    const handleToDateConfirm = (date) => {
        if (selectedTDate != date && selectedFDate != date) {
            setSelectedTDate(date)
            setDates(eachDayOfInterval(
                {
                    start: selectedFDate,
                    end: new Date(date),
                },
                {
                    weekStartsOn: 1,
                }))
        }
    };

    const FilterData = (list) => {
        const descData = list.sort((a, b) => format(b.date, 'yyyy-MM-dd').localeCompare(format(a.date, 'yyyy-MM-dd')));
        setBookingsForTable(descData);
    }

    const Views = [
        {
            width: '32%',
            title: 'Date',
            color: GRADIENTCOLOR.BLACK_50_100_100_100,
        },
        {
            width: '21%',
            title: 'Verified',
            color: GRADIENTCOLOR.GREEN_100_100,
        },
        {
            width: '21%',
            title: 'Cancelled',
            color: GRADIENTCOLOR.RED_100_100,
        },
        {
            width: '21%',
            title: 'Total',
            color: GRADIENTCOLOR.ORANGE_100_100,
        },
    ]

    return (
        <ScreenHeader
            navigation={navigation}
            title={'Bookings'}
        >
            <View style={styles.Container} >

                <View style={[styles.DatePickerContainer, Elevation_2]}>
                    <DatePicker
                        label={'From'}
                        date={selectedFDate}
                        setSelectedDate={handleFromDateConfirm}
                        minDate={isAll ? '2024-01-01' : route.params.startDate}
                        maxDate={selectedTDate}
                    />
                    <View style={{ width: 15, }} />
                    <DatePicker
                        label={'To'}
                        date={selectedTDate}
                        setSelectedDate={handleToDateConfirm}
                        minDate={selectedFDate}
                        maxDate={addDays(new Date(), 6)}
                    />
                </View>

                <BookingsLineChart
                    title={title}
                    data={bookingsForTable}
                    fromDate={selectedFDate}
                    toDate={selectedTDate}
                />

                <View style={[styles.BookingListContainer, Elevation_2]}>
                    <View style={styles.HeaderContainer}>
                        {
                            Views.map((view, i) => {
                                return (
                                    <LinearGradient
                                        key={i}
                                        colors={view.color}
                                        style={{
                                            width: view.width,
                                            borderRadius: 5,
                                        }}
                                        angle={160}
                                        useAngle
                                    >
                                        <Text style={styles.HeaderTextStyle}>{view.title}</Text>
                                    </LinearGradient>
                                )
                            })
                        }
                    </View>

                    {
                        loading ?
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                <ActivityIndicator size={'small'} color={COLOR.BLACK} />
                            </View>
                            :
                            <FlatList
                                data={bookingsForTable}
                                renderItem={({ item }) =>
                                    <View
                                        style={styles.ListViewContainer}
                                    >
                                        <Text style={[{ width: Views[0].width }, styles.ListTextStyle]} numberOfLines={1}>{format(new Date(item.date), 'dd/MM/yyyy')}</Text>
                                        <Text style={[{ width: Views[1].width }, styles.ListTextStyle]} numberOfLines={1}>{item.verify}</Text>
                                        <Text style={[{ width: Views[2].width }, styles.ListTextStyle]} numberOfLines={1}>{item.cancel}</Text>
                                        <Text style={[{ width: Views[3].width }, styles.ListTextStyle]} numberOfLines={1}>{item.total}</Text>
                                    </View>
                                }
                                style={{ width: '100%' }}
                                contentContainerStyle={{ width: '100%' }}
                                keyExtractor={item => item.date}
                                showsVerticalScrollIndicator={false}
                            />
                    }
                </View>
            </View>
        </ScreenHeader>
    )
}

export default BookingsScreen

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        paddingTop: 55,
        padding: 15,
    },
    DatePickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.BORDERCOLOR,
        backgroundColor: COLOR.WHITE,
    },
    BookingListContainer: {
        flex: 1,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.BORDERCOLOR,
        backgroundColor: COLOR.WHITE,
        marginTop: 15,
        padding: 10,
    },
    HeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    HeaderTextStyle: {
        textAlign: 'center',
        color: COLOR.WHITE,
        fontSize: 12,
        paddingVertical: 7,
        fontWeight: '600',
    },
    ListViewContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: COLOR.BORDERCOLOR,
        alignItems: 'center',
    },
    ListTextStyle: {
        textAlign: 'center',
        color: COLOR.BLACK,
        paddingVertical: 10,
        fontSize: 13,
        paddingHorizontal: 5,
    },
})