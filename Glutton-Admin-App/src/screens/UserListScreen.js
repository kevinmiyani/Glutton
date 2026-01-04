import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { emailIcon, googleIcon, phoneIcon, usersIcon } from '../constants/Icons';
import ScreenHeader from '../components/ScreenHeader';
import { COLOR, GRADIENTCOLOR } from '../constants/Colors';
import SearchView from '../components/SearchView';
import { Elevation_2, Elevation_5 } from '../constants/Elevation';
import UserListComponent from '../components/UserListComponent';
import UserDetailsModal from '../components/modals/UserDetailsModal';

const UserListScreen = ({ navigation }) => {

    const userData = useSelector(state => state.UsersReducer);
    const [users, setUsers] = useState(userData);
    const [userDetails, setUserDetails] = useState([]);

    useEffect(() => { setUsers(userData) }, [userData])

    const [search, setSearch] = useState('');
    const authTypes = [
        {
            type: "All",
            icon: usersIcon,
        },
        {
            type: 'Google',
            icon: googleIcon,
        },
        {
            type: 'Email',
            icon: emailIcon,
        },
        // {
        //     type: 'Phone',
        //     icon: phoneIcon,
        // },
    ];
    const [selectedType, setSelectedType] = useState(authTypes[0].type);

    const [isModalVisible, setModalVisible] = useState(false);

    const ViewUserDetails = (data) => {
        setUserDetails(data);
        setModalVisible(true);
    }

    const SeachByType = (type) => {
        setSelectedType(type);
        if (type == authTypes[0].type) {
            setUsers(userData);
        } else {
            setUsers(
                userData.filter((i) => i?.authType.toLowerCase() == type.toLowerCase())
            )
        }
    }

    const onSearch = (text) => {
        setSearch(text);
        if (selectedType != authTypes[0].type) {
            setSelectedType(authTypes[0].type);
        }
        if (text.length > 0) {
            setUsers(
                userData.filter((i) => i?.userName?.toLowerCase().includes(text.toLowerCase()))
            )
        } else {
            setUsers(userData);
            setSelectedType(authTypes[0].type);
        }
    }

    const onClearSearch = () => {
        setSearch('');
        setUsers(userData);
        setSelectedType(authTypes[0].type);
    }

    const Views = [
        {
            width: '37.5%',
            title: 'Users',
        },
        {
            width: '36.5%',
            title: 'Contact',
        },
        {
            width: '12.5%',
            title: 'Type',
        },
        {
            width: '10.5%',
            title: 'View',
        },
    ]

    return (
        <ScreenHeader
            navigation={navigation}
            title={'Users'}
        >
            <View style={styles.FilterContainer}>
                <SearchView
                    placeholder={'User'}
                    search={search}
                    onChangeText={onSearch}
                    onClear={onClearSearch}
                />

                <View style={styles.TypeSelectionView} >
                    {
                        authTypes.map((item, i) => {
                            return (
                                <TouchableOpacity
                                    key={i}
                                    onPress={() => {
                                        SeachByType(item.type);
                                    }}
                                    style={[
                                        styles.TypeSelectionButton,
                                        selectedType == item.type ?
                                            { ...Elevation_5, transform: [{ scale: 1.025 }] }
                                            :
                                            Elevation_2
                                    ]}
                                    activeOpacity={1}
                                >
                                    <FastImage
                                        source={item.icon}
                                        style={styles.TypeSelectionIcon}
                                    />
                                    {
                                        selectedType == item.type &&
                                        <Text style={styles.TypeSelectionText}>
                                            {item.type}
                                        </Text>
                                    }
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>

            <View style={styles.ListContainer}>
                {/* Header View */}
                <View
                    style={styles.HeaderContainer}
                >
                    {
                        Views.map((content, i) => {
                            return (
                                <LinearGradient
                                    key={i}
                                    colors={GRADIENTCOLOR.BLACK_50_100_100_100}
                                    style={[styles.HeaderCardView, { width: content.width }]}
                                    angle={160}
                                    useAngle
                                >
                                    <Text style={[[styles.HeaderTextStyle, { paddingVertical: 7, }]]}>{content.title}</Text>
                                </LinearGradient>
                            )
                        })
                    }
                </View>

                <FlatList
                    data={users}
                    keyExtractor={item => item._id}
                    style={styles.ListView}
                    contentContainerStyle={styles.ListContentView}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<Text style={styles.ListEmptyText}>User Not Found</Text>}
                    renderItem={({ item }) =>
                        <UserListComponent
                            item={item}
                            Views={Views}
                            authTypes={authTypes}
                            onPress={ViewUserDetails}
                        />
                    }
                />
            </View>

            <Modal
                animationType='fade'
                visible={isModalVisible}
                transparent
                statusBarTranslucent
                onRequestClose={() => { setModalVisible(false) }}
            >
                <UserDetailsModal
                    data={userDetails}
                    onDismiss={setModalVisible}
                />
            </Modal>
        </ScreenHeader>
    )
}

export default UserListScreen

const styles = StyleSheet.create({
    FilterContainer: {
        marginTop: 55,
        paddingHorizontal: 15,
    },
    TypeSelectionView: {
        width: '100%',
        paddingVertical: 15,
        alignItems: 'center',
        flexDirection: 'row',
    },
    TypeSelectionButton: {
        marginHorizontal: 5,
        paddingHorizontal: 6,
        borderRadius: 12,
        height: 32,
        justifyContent: 'center',
        backgroundColor: COLOR.WHITE,
        flexDirection: 'row',
        alignItems: 'center',
    },
    TypeSelectionIcon: {
        width: 20,
        aspectRatio: 1 / 1,
        marginHorizontal: 10,
    },
    TypeSelectionText: {
        fontSize: 12,
        marginRight: 10,
        color: COLOR.BLACK,
    },
    ListContainer: {
        paddingHorizontal: 10,
        flex: 1,
    },
    HeaderContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    HeaderCardView: {
        borderRadius: 5,
    },
    HeaderTextStyle: {
        width: '100%',
        textAlign: 'center',
        color: COLOR.WHITE,
        fontSize: 13,
    },
    ListView: {
        flex: 1,
    },
    ListContentView: {
        paddingBottom: 10
    },
    ListEmptyText: {
        color: COLOR.GRAY,
        margin: 20,
        alignSelf: 'center',
    },
})