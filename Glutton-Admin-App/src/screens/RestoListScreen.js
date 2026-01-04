import React, { useEffect, useState } from 'react'
import {
    FlatList,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import { useSelector } from 'react-redux';
import ScreenHeader from '../components/ScreenHeader';
import SearchView from '../components/SearchView';
import RestoCardComponent from '../components/RestoCardComponent';

const RestoListScreen = ({ navigation }) => {

    const restListData = useSelector(state => state.RestoReducer);
    const [restList, setRestList] = useState(restListData);
    const [search, setSearch] = useState('');

    useEffect(() => { setRestList(restListData) }, [restListData])

    const onSearch = (text) => {
        setSearch(text);
        if (text.length > 0) {
            setRestList(
                restListData.filter((i) => i?.restaurantName?.toLowerCase().includes(text.toLowerCase()))
            )
        } else {
            setRestList(restListData);
        }
    }

    const onClear = () => {
        setSearch('');
        setRestList(restListData);
    }

    return (
        <ScreenHeader
            navigation={navigation}
            title={'Restaurants'}
        >
            <ScrollView
                style={styles.Container}

                showsVerticalScrollIndicator={false}
            >
                <View style={styles.SearchContainer}>
                    <SearchView
                        placeholder={'Restaurant'}
                        search={search}
                        onChangeText={onSearch}
                        onClear={onClear}
                    />
                </View>
                <FlatList
                    data={restList}
                    keyExtractor={item => item._id}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.ContentContainer}
                    renderItem={({ item }) =>
                        <RestoCardComponent
                            data={item}
                            navigation={navigation}
                        />
                    }
                />
            </ScrollView>
        </ScreenHeader>
    )
}

export default RestoListScreen

const styles = StyleSheet.create({
    Container: {
        flex: 1
    },
    SearchContainer: {
        paddingHorizontal: 15,
        paddingTop: 55,
    },
    ContentContainer: {
        padding: 15,
        paddingTop: 0,
    },
})