import { StyleSheet, Text, View, FlatList, ScrollView, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationScreens } from '../constants/Strings';
import { useSelector } from 'react-redux';
import ScreenHeader from '../components/ScreenHeader';
import MenuCardComponent from '../components/MenuCardComponent';
import SearchView from '../components/SearchView';
import FloatingAddButton from '../components/buttons/FloatingAddButton';
import { COLOR } from '../constants/Colors';

const MenuCategoryScreen = ({ navigation }) => {
    const categoriesData = useSelector(state => state.CategoryReducer);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState('');

    const onSearch = (text) => {
        setSearch(text);
        if (text.length > 0) {
            setCategories(
                categoriesData.filter((i) => i?.name?.toLowerCase().includes(text.toLowerCase()))
            )
        } else {
            setCategories(categoriesData);
        }
    }

    useEffect(() => { setCategories(categoriesData) }, [categoriesData])

    const onClear = () => {
        setSearch('');
        setCategories(categoriesData);
    }

    return (
        <ScreenHeader
            title={'Menu Categories'}
            navigation={navigation}
        >
            <ScrollView
                style={styles.Container}
                contentContainerStyle={styles.ContentContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ paddingHorizontal: 5, marginBottom: 10, }}>
                    <SearchView
                        search={search}
                        onChangeText={onSearch}
                        onClear={onClear}
                        placeholder={'Category'}
                    />
                </View>
                {
                    categories.length > 0 ?
                        <FlatList
                            data={categories}
                            renderItem={
                                ({ item }) =>
                                    <MenuCardComponent
                                        data={item}
                                        onPress={() => {
                                            navigation.navigate(NavigationScreens.ManageCategoryScreen, {
                                                data: item,
                                            })
                                        }}
                                    />
                            }
                            keyExtractor={item => item._id}
                            showsVerticalScrollIndicator={false}
                            scrollEnabled={false}
                            numColumns={2}
                        />
                        :
                        <View
                            style={styles.EmptyContainer}
                        >
                            <Text style={styles.EmptyText}>Menu Categories Not Found</Text>
                        </View>
                }
            </ScrollView>
            <FloatingAddButton
                onPress={() => {
                    navigation.navigate(NavigationScreens.ManageCategoryScreen);
                }}
            />
        </ScreenHeader>
    )
}

export default MenuCategoryScreen

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    ContentContainer: {
        paddingTop: 55,
        paddingHorizontal: 5,
        minHeight: '90%',
    },
    EmptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    EmptyText: {
        color: COLOR.GRAY,
    },
})