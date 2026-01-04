import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLOR } from '../../constants/Colors'

const TitleValuePairLabel = ({
    title,
    value,
    values,
    iconValue,
    marginTop = 10,
}) => {
    return (
        <View style={[styles.DetailListComponent, { marginTop }]}>
            <Text style={styles.DetailListTitle} numberOfLines={1}>{title}</Text>
            {
                iconValue ?
                    iconValue
                    :
                    values && values.length > 0 ?
                        <Text style={styles.DetailListValue} numberOfLines={1}>{values[0].value + ' to ' + values[1].value}</Text>
                        :
                        <Text style={styles.DetailListValue} numberOfLines={1} >{value}</Text>
            }
        </View>
    )
}

export default TitleValuePairLabel

const styles = StyleSheet.create({
    DetailListComponent: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    DetailListTitle: {
        color: COLOR.BLACK,
        fontSize: 12,
    },
    DetailListValue: {
        color: COLOR.BLACK60,
        fontSize: 12,
        flex: 1,
        marginLeft: 20,
        textAlign: 'right',
    },
})