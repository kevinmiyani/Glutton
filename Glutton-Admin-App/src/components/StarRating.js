import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLOR } from '../constants/Colors';

const StarRating = (props) => {

    let stars = [];
    for (var i = 1; i <= 5; i++) {
        let name = 'star';
        if (i > props.ratings) {
            name = 'star-outline';
        }
        stars.push((<Ionicons name={name} size={14} style={styles.star} key={i} />));
    }

    return (
        <View style={styles.container}>
            {stars}
            {
                props.reviews ?
                    <Text style={styles.text} numberOfLines={1}>({props.reviews})</Text>
                    : null
            }
        </View>
    );

}

export default StarRating;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    star: {
        color: COLOR.RATING,
        marginRight: 2,
    },
    text: {
        fontSize: 11,
        marginLeft: 3,
        color: COLOR.WHITE,
        flex: 1,
    }
});