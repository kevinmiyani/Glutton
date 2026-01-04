import { StyleSheet, View } from 'react-native'
import React from 'react'
import ColorPicker, { Panel1, OpacitySlider, HueSlider, InputWidget, } from 'reanimated-color-picker';
import { COLOR } from '../constants/Colors';
import { Elevation_2, Elevation_5 } from '../constants/Elevation';

const ColorPickerComponent = ({
    value,
    onChange,
}) => {
    return (
        <ColorPicker
            style={styles.Container}
            value={value}
            onChange={onChange}
            onComplete={onChange}
        >
            <View style={[styles.ContentContainer, Elevation_2]} >
                <Panel1 style={[styles.Panel1, Elevation_5]} thumbSize={25} />

                <InputWidget
                    defaultFormat='RGB'
                    formats={['RGB', 'HEX']}
                    inputStyle={{
                        borderColor: COLOR.BORDERCOLOR,
                    }}
                    inputTitleStyle={{
                        color: COLOR.BLACK,
                        fontSize: 13,
                    }}
                    containerStyle={{
                        marginTop: 15,
                        marginBottom: 5,
                        paddingHorizontal: 20,
                    }}
                />

                <HueSlider style={[styles.Slider, Elevation_5]} thumbSize={25} />

                <OpacitySlider style={[styles.Slider, Elevation_5]} thumbSize={25} />
            </View>
        </ColorPicker>
    )
}

export default ColorPickerComponent

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        marginTop: 15,
    },
    ContentContainer: {
        width: '100%',
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.BORDERCOLOR,
        backgroundColor: COLOR.WHITE,
    },
    Panel1: {
        borderRadius: 10,
    },
    Slider: {
        marginTop: 10,
    }
})