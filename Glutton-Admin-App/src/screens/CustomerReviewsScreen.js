import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import ReviewCard from '../components/ReviewCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ScreenHeader from '../components/ScreenHeader';
import { COLOR } from '../constants/Colors';

const CustomerReviewsScreen = ({ route, navigation }) => {
    const allData = route?.params?.data || [];

    const [cardList, setCardList] = useState(allData);

    filter = [
        {
            star: 'All',
        },
        {
            star: '5',
        },
        {
            star: '4',
        },
        {
            star: '3',
        },
        {
            star: '2',
        },
        {
            star: '1',
        },
    ]

    const [star, setStar] = useState(filter[0].star);

    const SearchByStars = (star) => {
        setStar(star);
        if (star == "All") {
            setCardList(allData);
        } else {
            setCardList(
                allData?.filter((i) => i?.rating == star)
            )
        }
    }

    return (
        <ScreenHeader
            title={'Reviews & Ratings'}
            navigation={navigation}
        >
            <ScrollView
                horizontal
                style={styles.FilterContainer}
                contentContainerStyle={styles.FilterContentContainer}
                showsHorizontalScrollIndicator={false}
            >
                {
                    filter.map((item, i) => {
                        return (
                            <TouchableOpacity
                                key={i}
                                onPress={() => {
                                    SearchByStars(item.star);
                                }}
                                style={[styles.FilterButton, { backgroundColor: star == item.star ? COLOR.BLACK : COLOR.BORDERCOLOR, }]}
                                activeOpacity={1}
                            >
                                <Text style={[styles.FilterText, {
                                    color: star == item.star ? COLOR.WHITE : COLOR.BLACK,
                                }]}>{item.star}</Text>

                                {
                                    item.star != "All" &&
                                    <Ionicons name={"star"} size={12} style={{ marginLeft: 5, }} key={i} color={star == item.star ? COLOR.WHITE : COLOR.BLACK} />
                                }
                            </TouchableOpacity>
                        )
                    })

                }
            </ScrollView>

            {
                cardList.length > 0 ?
                    <FlatList
                        data={cardList}
                        renderItem={
                            ({ item }) => <ReviewCard data={item} />
                        }
                        keyExtractor={item => item._id}
                        showsVerticalScrollIndicator={false}
                        style={styles.ReviewContainer}
                        contentContainerStyle={styles.ReviewContentContainer}
                    />
                    :
                    <View style={styles.Flex1}>
                        <Text style={{ color: COLOR.GRAY }}>No Review</Text>
                    </View>
            }
        </ScreenHeader>
    )
}

export default CustomerReviewsScreen

const styles = StyleSheet.create({
    FilterContainer: {
        flexGrow: 0,
    },
    FilterContentContainer: {
        paddingTop: 55,
        paddingHorizontal: 12.5,
    },
    FilterButton: {
        paddingHorizontal: 20,
        marginHorizontal: 2.5,
        borderRadius: 13,
        height: 35,
        flexDirection: 'row',
        alignItems: 'center',
    },
    FilterText: {
        fontSize: 13,
        fontWeight: '700',
    },
    ReviewContainer: {
        flex: 1,
        marginTop: 15,
    },
    ReviewContentContainer: {
        paddingHorizontal: 15,
        paddingBottom: 5,
    },
    Flex1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})