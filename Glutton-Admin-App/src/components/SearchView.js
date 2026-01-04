import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLOR } from '../constants/Colors';

const SearchView = ({
    search,
    onChangeText,
    placeholder,
    onClear,
}) => {
    return (
        <View style={styles.SearchView}>
            <FontAwesome name='search' size={15} color={COLOR.GRAY} />
            <TextInput
                placeholder={`Search ${placeholder}`}
                style={styles.Search}
                placeholderTextColor={COLOR.GRAY}
                onChangeText={onChangeText}
                value={search}
            />
            {
                search.length > 0 &&
                <TouchableOpacity
                    style={styles.ClearButton}
                    onPress={onClear}>
                    <Ionicons name='close' size={20} color={COLOR.BLACK} />
                </TouchableOpacity>
            }
        </View>
    )
}

export default SearchView

const styles = StyleSheet.create({
    SearchView: {
        backgroundColor: 'rgba(243,244,246,1)',
        width: '100%',
        height: 40,
        marginBottom: 0,
        alignSelf: 'center',
        borderRadius: 15,
        paddingLeft: 15,
        paddingRight: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    Search: {
        flex: 1,
        color: '#000',
        marginLeft: 10,
        height: 40,
        fontSize: 13,
    },
    ClearButton: {
        paddingHorizontal: 10,
        height: '100%',
        justifyContent: 'center',
    },
})