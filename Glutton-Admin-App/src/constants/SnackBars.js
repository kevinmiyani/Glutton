import Snackbar from "react-native-snackbar";
import { COLOR } from "./Colors";
import { Platform, ToastAndroid } from "react-native";

export const NormalSnackBar = (msg) => {
    if (Platform.OS == 'android') {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
        return;
    }
    return Snackbar.show({
        text: msg,
        duration: Snackbar.LENGTH_SHORT,
    });
}

export const ActionSnackBar = (msg, label, action) => {
    return Snackbar.show({
        text: msg,
        duration: Snackbar.LENGTH_LONG,
        action: {
            text: label,
            textColor: COLOR.WHITE,
            onPress: action,
        },
    });
}