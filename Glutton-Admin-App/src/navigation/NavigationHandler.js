import { createStackNavigator } from '@react-navigation/stack';
import { NavigationScreens } from '../constants/Strings';
import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import ForgotPassword from '../screens/ForgotPassword';
import PackagesScreen from '../screens/PackagesScreen';
import MenuCategoryScreen from '../screens/MenuCategoryScreen';
import UserListScreen from '../screens/UserListScreen';
import RestoListScreen from '../screens/RestoListScreen';
import RestoProfileScreen from '../screens/RestoProfileScreen';
import CustomerReviewsScreen from '../screens/CustomerReviewsScreen';
import HomeScreen from '../screens/HomeScreen';
import ManageCategoryScreen from '../screens/ManageCategoryScreen';
import BookingsScreen from '../screens/BookingsScreen';

const Stack = createStackNavigator();

export const LoginNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={NavigationScreens.LoginScreen} component={LoginScreen} />
            <Stack.Screen name={NavigationScreens.HomeScreen} component={HomeScreen} />
            <Stack.Screen name={NavigationScreens.ForgotPasswordScreen} component={ForgotPassword} />
            <Stack.Screen name={NavigationScreens.PackagesScreen} component={PackagesScreen} />
            <Stack.Screen name={NavigationScreens.MenuCategoryScreen} component={MenuCategoryScreen} />
            <Stack.Screen name={NavigationScreens.ManageCategoryScreen} component={ManageCategoryScreen} />
            <Stack.Screen name={NavigationScreens.UserListScreen} component={UserListScreen} />
            <Stack.Screen name={NavigationScreens.RestoListScreen} component={RestoListScreen} />
            <Stack.Screen name={NavigationScreens.RestoProfileScreen} component={RestoProfileScreen} />
            <Stack.Screen name={NavigationScreens.CustomerReviewsScreen} component={CustomerReviewsScreen} />
            <Stack.Screen name={NavigationScreens.BookingsScreen} component={BookingsScreen} />
        </Stack.Navigator>
    )
}

export const HomeNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={NavigationScreens.HomeScreen} component={HomeScreen} />
            <Stack.Screen name={NavigationScreens.LoginScreen} component={LoginScreen} />
            <Stack.Screen name={NavigationScreens.ForgotPasswordScreen} component={ForgotPassword} />
            <Stack.Screen name={NavigationScreens.PackagesScreen} component={PackagesScreen} />
            <Stack.Screen name={NavigationScreens.MenuCategoryScreen} component={MenuCategoryScreen} />
            <Stack.Screen name={NavigationScreens.ManageCategoryScreen} component={ManageCategoryScreen} />
            <Stack.Screen name={NavigationScreens.UserListScreen} component={UserListScreen} />
            <Stack.Screen name={NavigationScreens.RestoListScreen} component={RestoListScreen} />
            <Stack.Screen name={NavigationScreens.RestoProfileScreen} component={RestoProfileScreen} />
            <Stack.Screen name={NavigationScreens.CustomerReviewsScreen} component={CustomerReviewsScreen} />
            <Stack.Screen name={NavigationScreens.BookingsScreen} component={BookingsScreen} />
        </Stack.Navigator>
    )
}