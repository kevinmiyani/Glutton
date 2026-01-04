import { Linking, Platform } from 'react-native';
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';
import { ActionSnackBar } from './SnackBars';

export const CheckPermission = (permission) => {
    return check(permission)
        .then(async (result) => {
            switch (result) {
                case RESULTS.UNAVAILABLE:
                    return Platform.OS == 'android' && await RequestPermission(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
                    break;
                case RESULTS.DENIED:
                    return await RequestPermission(permission);
                    break;
                case RESULTS.GRANTED:
                    return true;
                    break;
                case RESULTS.BLOCKED:
                    ActionSnackBar('Give photo access permission', 'Settings', () => { Linking.openSettings() });
                    break;
            }
        }).catch((error) => { console.log(error) })
}

const RequestPermission = (permission) => {
    return request(permission, true).then((result) => {
        switch (result) {
            case RESULTS.GRANTED:
                return true;
                break;
            case RESULTS.BLOCKED:
                ActionSnackBar('Give photo access permission', 'Settings', () => { Linking.openSettings() });
                break;
        }
    })
}