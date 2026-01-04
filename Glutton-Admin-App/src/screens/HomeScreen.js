import { StyleSheet, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import BookingChart from '../components/dashboardCharts/BookingChart';
import UserChart from '../components/dashboardCharts/UserChart';
import { useDispatch, useSelector } from 'react-redux';
import { FetchUserData } from '../redux/UsersActions';
import { FetchRestoData } from '../redux/RestoAction';
import { FetchBookingsData } from '../redux/BookingsAction';
import ScreenHeader from '../components/ScreenHeader';
import DashboardCard from '../components/DashboardCard';
import { dashboardTiels } from '../constants/Constants';
import PieChart from '../components/dashboardCharts/PieChart';
import { NavigationScreens } from '../constants/Strings';
import { COLOR } from '../constants/Colors';
import { FetchCategoriesData } from '../redux/CategoryAction';
import { FetchPackagesData } from '../redux/PackagesAction';
import {
    getAllBookingsListAPI,
    getAllCustomerListAPI,
    getAllMenuCategoryListAPI,
    getAllPackagesListAPI,
    getAllRestauratListAPI
} from '../api/utils';
import socketServices from '../api/Socket';

const HomeScreen = ({ navigation }) => {

    const dispatch = useDispatch();
    const UserData = useSelector(state => state.UsersReducer);
    const RestoData = useSelector(state => state.RestoReducer);
    const BookingData = useSelector(state => state.BookingsReducer);
    const CategoryData = useSelector(state => state.CategoryReducer);
    const PackagesData = useSelector(state => state.PackagesReducer);

    const totUser = UserData ? UserData.length : 0;
    const totRest = RestoData ? RestoData.length : 0;
    const totBookings = BookingData ? BookingData.length : 0;
    const totCategory = CategoryData ? CategoryData.length : 0;
    const totPackages = PackagesData ? PackagesData.length : 0;

    const [usersPieChartData, setUsersPieChartData] = useState({ labels: [], dataSet: [], colors: [] });
    const [restoPieChartData, setRestoPieChartData] = useState({ labels: [], dataSet: [], colors: [] });

    useEffect(() => {
        fetchUserData();
        fetchRestData();
        fetchBookings();
        fetchCategories();
        fetchPackages();

        socketServices.initializeSocket();

        socketServices.on('BookingTimeSlotChange', fetchBookings);
        socketServices.on('ReviewAdded', fetchRestData);
        socketServices.on('RestoUpdates', fetchRestData);
        socketServices.on('MenuCategoryUpdate', fetchCategories);
        socketServices.on('CustomersUpdates', fetchUserData);

        return () => {
            socketServices.removeListener('BookingTimeSlotChange');
            socketServices.removeListener('ReviewAdded');
            socketServices.removeListener('RestoUpdates');
            socketServices.removeListener('MenuCategoryUpdate');
            socketServices.removeListener('CustomersUpdates');
        }
    }, [])

    useEffect(() => {
        if (UserData && UserData.length > 0) {
            const types = [
                "Google",
                "Email",
                // "Phone"
            ];
            let dataList = [];

            types.map(type => {
                const x = type;
                const y = UserData.filter((i) => i?.authType?.toLowerCase() == type.toLowerCase()).length;
                dataList.push({ x, y });
            })
            setUsersPieChartData({
                labels: types,
                dataSet: dataList,
                colors: [COLOR.RGB.RED, COLOR.RGB.GREEN, COLOR.RGB.BLUE],
            })
        }
    }, [UserData])

    useEffect(() => {
        if (RestoData && RestoData.length > 0) {
            const types = [true, false];
            let dataList = [];
            types.map(type => {
                const x = type;
                const y = RestoData.filter((i) => i?.isActive == type).length;
                dataList.push({ x, y });
            })
            setRestoPieChartData({
                labels: ["Active", "Deactive"],
                dataSet: dataList,
                colors: [COLOR.RGB.GREEN, COLOR.RGB.RED,],
            })
        }
    }, [RestoData])

    const fetchUserData = async () => {
        try {
            const res = await getAllCustomerListAPI();
            res?.data?.data && dispatch(FetchUserData(res.data.data));
        } catch (e) {
            console.log(e);
        }
    }

    const fetchRestData = async () => {
        try {
            const res = await getAllRestauratListAPI();
            res?.data?.data && dispatch(FetchRestoData(res.data.data));
        } catch (e) {
            console.log(e);
        }
    }

    const fetchBookings = async () => {
        try {
            const res = await getAllBookingsListAPI();
            res?.data?.data && dispatch(FetchBookingsData(res.data.data));
        } catch (e) {
            console.log(e);
        }
    }

    const fetchCategories = async () => {
        try {
            const res = await getAllMenuCategoryListAPI();
            res?.data?.data && dispatch(FetchCategoriesData(res.data.data));
        } catch (e) {
            console.log(e);
        }
    }

    const fetchPackages = async () => {
        try {
            const res = await getAllPackagesListAPI();
            res?.data?.data && dispatch(FetchPackagesData(res.data.data));
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <ScreenHeader
            navigation={navigation}
            isDashboard
            title={'Dashboard'}
        >
            <ScrollView
                contentContainerStyle={styles.Container}
                showsVerticalScrollIndicator={false}
            >
                <View
                    style={{
                        flexDirection: 'row',
                    }}
                >
                    <DashboardCard
                        navigation={navigation}
                        data={dashboardTiels.users}
                        values={totUser}
                    />
                    <View style={{ width: 10, }} />
                    <DashboardCard
                        navigation={navigation}
                        data={dashboardTiels.restaurant}
                        values={totRest}
                    />
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: 10,
                    }}
                >
                    <DashboardCard
                        navigation={navigation}
                        data={dashboardTiels.bookings}
                        values={totBookings}
                    />
                    <View style={{ width: 10, }} />
                    <DashboardCard
                        navigation={navigation}
                        data={dashboardTiels.category}
                        values={totCategory}
                    />
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: 10,
                    }}
                >
                    <DashboardCard
                        navigation={navigation}
                        data={dashboardTiels.packages}
                        values={totPackages}
                    />
                    <View style={{ flex: 1, marginLeft: 20, }} />
                </View>

                <PieChart
                    navigation={navigation}
                    data={usersPieChartData}
                    label={'Users'}
                    navigationScreen={NavigationScreens.UserListScreen}
                />

                <PieChart
                    navigation={navigation}
                    data={restoPieChartData}
                    label={'Restaurants'}
                    navigationScreen={NavigationScreens.RestoListScreen}
                    isFlip
                />

                <BookingChart navigation={navigation} bookingData={BookingData} />

                <UserChart />

            </ScrollView>
        </ScreenHeader>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    Container: {
        paddingTop: 55,
        paddingHorizontal: 15,
        paddingBottom: 15,
    },
})