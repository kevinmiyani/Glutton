import { Dimensions, Platform } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { NavigationScreens } from "./Strings";
import { COLOR } from "./Colors";

export const Screen_Width = Dimensions.get('window').width;
export const Screen_Height = Platform.OS == 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height + 45;

export const dashboardTiels = {
    users: {
        icon: <Feather name='user' size={17} color={COLOR.TIELS.USERS.ICON} />,
        Screen: NavigationScreens.UserListScreen,
        title: 'Users',
        iconBackgroundColor: COLOR.TIELS.USERS.ICONBACK,
    },
    restaurant: {
        icon: <Fontisto name={'shopping-store'} size={17} color={COLOR.TIELS.RESTAURANTS.ICON} />,
        Screen: NavigationScreens.RestoListScreen,
        title: 'Restaurants',
        iconBackgroundColor: COLOR.TIELS.RESTAURANTS.ICONBACK,
    },
    bookings: {
        icon: <Ionicons name='calendar' size={17} color={COLOR.TIELS.BOOKINGS.ICON} />,
        Screen: NavigationScreens.BookingsScreen,
        title: 'Bookings',
        iconBackgroundColor: COLOR.TIELS.BOOKINGS.ICONBACK,
    },
    category: {
        icon: <MaterialIcons name={'restaurant-menu'} size={17} color={COLOR.TIELS.CATEGORIES.ICON} />,
        Screen: NavigationScreens.MenuCategoryScreen,
        title: 'Categories',
        iconBackgroundColor: COLOR.TIELS.CATEGORIES.ICONBACK,
    },
    packages: {
        icon: <FontAwesome name={'money'} size={17} color={COLOR.TIELS.PACKAGES.ICON} />,
        Screen: NavigationScreens.PackagesScreen,
        title: 'Packages',
        iconBackgroundColor: COLOR.TIELS.PACKAGES.ICONBACK,
    },
}