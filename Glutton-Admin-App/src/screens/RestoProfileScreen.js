import { StyleSheet, ScrollView, } from 'react-native'
import React, { useState, useEffect } from 'react'
import RestBookingChart from '../components/RestBookingChart';
import { eachDayOfInterval, format, subDays } from 'date-fns';
import RatingChart from '../components/RatingChart';
import { useSelector } from 'react-redux';
import { TypeRestoOfData } from '../constants/Strings';
import ScreenHeader from '../components/ScreenHeader';
import RestoDetailsCard from '../components/RestoDetailsCard';
import { getRestaurantReviewsAPI } from '../api/utils';
import socketServices from '../api/Socket';

const RestoProfileScreen = ({ navigation, route }) => {

    const BookingData = useSelector(state => state.BookingsReducer);

    const restData = route.params.data;
    const restId = restData?.uid;

    const [ratingData, setRatingData] = useState([]);
    const [ratingChartData, setRatingChartData] = useState([]);

    const [tdata, setTData] = useState([]);
    const [vdata, setVData] = useState([]);
    const [cdata, setCData] = useState([]);

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
        const Bookings = BookingData.filter((i) => i?.restaurant?.uid == restId);
        setTData(processBookingData(Bookings));
        setVData(processBookingData(Bookings.filter((i) => i?.isVerify == true)));
        setCData(processBookingData(Bookings.filter((i) => i?.isCancel == true)));
    }, [BookingData])

    useEffect(() => {
        ProcessData();
    }, [restData])

    useEffect(() => {
        fetchRatings();

        socketServices.on('ReviewAdded', fetchRatings);
        return () => {
            socketServices.removeListener('ReviewAdded');
        }
    }, []);

    useEffect(() => {
        ratingData && processRatingData(ratingData);
    }, [ratingData])

    const ProcessData = () => {
        let restDetails = TypeRestoOfData;
        restDetails.map((item) => {
            item.data.map((field) => {
                if (field.values) {
                    field.values.map((fv) => {
                        fv.value = restData[fv.key];
                    })
                } else {
                    field.value = field.key == 'contactNo' ? `+91 ${restData[field.key]}` : restData[field.key];
                }
            });
        });
        setData(restDetails);
    }

    const processBookingData = (bookings) => {
        let dataList = [];
        dates.map(date => {
            const x = DayOfWeek[date.getDay()];
            const y = bookings.filter((i) => i?.booking?.date == format(new Date(date), 'yyyy-MM-dd')).length;
            dataList.push({ x, y });
        })
        return dataList;
    }

    const fetchRatings = async () => {
        try {
            try {
                const res = await getRestaurantReviewsAPI(restId);
                res?.data && setRatingData(res.data?.data)
            } catch (e) {
                console.log(e);
            }

        } catch (e) {
            console.log(e);
        }
    }

    const processRatingData = (data) => {
        const stars = ['1', '2', '3', '4', '5'];
        let dataList = [];
        stars.map(star => {
            const x = star;
            const y = data?.filter((i) => i?.rating == star).length;
            dataList.push({ x, y });
        })
        setRatingChartData(dataList)
    }

    return (
        <ScreenHeader
            title={restData.restaurantName}
            navigation={navigation}
        >
            <ScrollView
                style={styles.Container}
                contentContainerStyle={styles.ContentContainer}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <RestBookingChart
                    vdata={vdata}
                    tdata={tdata}
                    cdata={cdata}
                    navigation={navigation}
                    restId={restId}
                    startDate={restData?.createdAt}
                    restName={restData?.restaurantName}
                />

                {data.length > 0 && data.map((item, i) => <RestoDetailsCard key={i} data={item} />)}

                <RatingChart
                    data={ratingChartData}
                    navigation={navigation}
                    restId={restId}
                    ratingData={ratingData}
                />
            </ScrollView>
        </ScreenHeader>
    )
}

export default RestoProfileScreen

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    ContentContainer: {
        paddingTop: 55,
        padding: 15,
    },
})