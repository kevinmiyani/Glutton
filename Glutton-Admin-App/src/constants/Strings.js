export const NavigationScreens = {
    LoginScreen: "Login Screen",
    RegisterScreen: "Register Screen",
    HomeScreen: "Home Screen",
    ForgotPasswordScreen: "Forgot Password Screen",
    PackagesScreen: "Packages Screen",
    MenuCategoryScreen: "Menu Category Screen",
    ManageCategoryScreen: "Manage Category Screen",
    UserListScreen: "User List Screen",
    RestoListScreen: "Resto List Screen",
    RestoProfileScreen: "Resto Profile Screen",
    CustomerReviewsScreen: "Customer Reviews Screen",
    BookingsScreen: "Bookings Screen",
}

export const TypeRestoOfData = [
    {
        title: 'Basic Details',
        data: [
            {
                key: 'restaurantName',
                title: 'Restaurant Name',
                value: '',
            },
            {
                key: 'ownerName',
                title: 'Owner Name',
                value: '',
            },
            {
                key: 'tables',
                title: 'Number of Tables',
                value: '',
            },
            {

                title: 'Time',
                values: [
                    {
                        key: 'openTime',
                        value: '',
                    },
                    {
                        key: 'closeTime',
                        value: '',
                    },
                ]
            },
        ]
    },
    {
        title: 'Contact Details',
        data: [
            {
                key: 'email',
                title: 'Email',
                value: '',
            },
            {
                key: 'contactNo',
                title: 'Contact No.',
                value: '',
            },
        ]
    },
    {
        title: 'Location Details',
        data: [
            {
                key: 'address',
                title: 'Address',
                value: '',
            },
            {
                key: 'city',
                title: 'City',
                value: '',
            },
            {
                key: 'state',
                title: 'State',
                value: '',
            },
            {
                key: 'pincode',
                title: 'Pincode',
                value: '',
            },
        ]
    },
];