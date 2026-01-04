import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { COLOR } from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { format } from 'date-fns';
import { Elevation_2 } from '../constants/Elevation';

const DatePicker = ({
    label,
    date,
    minDate,
    maxDate,
    setSelectedDate,
}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const showPicker = () => {
        setModalVisible(true);
    };

    const hidePicker = () => {
        setModalVisible(false);
    };

    const handleConfirm = (date) => {
        hidePicker();
        setSelectedDate(format(new Date(date), 'yyyy-MM-dd').toString());
    };
    return (
        <View style={styles.Container}>

            <Text style={styles.LabelText} numberOfLines={1}>{label}</Text>

            <TouchableOpacity
                style={[styles.Button, Elevation_2]}
                onPress={showPicker}
            >
                <Ionicons name='calendar' size={20} color={COLOR.BLACK} />
                <Text style={styles.DateText} numberOfLines={1}>{format(new Date(date), 'dd/MM/yyyy')}</Text>
            </TouchableOpacity>

            <DateTimePicker
                date={new Date(date)}
                isVisible={modalVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hidePicker}
                minimumDate={new Date(minDate)}
                maximumDate={new Date(maxDate)}
                buttonTextColorIOS={COLOR.BLACK}
            />
        </View>
    )
}

export default DatePicker

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    LabelText: {
        color: COLOR.GRAY,
        fontSize: 15,
        fontWeight: '700',
    },
    Button: {
        padding: 10,
        width: '100%',
        backgroundColor: COLOR.WHITE,
        borderColor: COLOR.BORDERCOLOR,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
    },
    DateText: {
        color: COLOR.BLACK,
        fontSize: 13,
        marginLeft: 10,
        fontWeight: '600',
    },
})