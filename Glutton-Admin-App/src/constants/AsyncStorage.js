import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAuthID = async () => {
    try {
        const value = await AsyncStorage.getItem("AuthId");
        if (value !== null) {
            return value;
        } else {
            return '';
        }
    } catch (error) {
        console.log('Error retrieving Auth Id:', error);
        return '';
    }
};

export const storeAuthID = async (value) => {
    try {
        await AsyncStorage.setItem("AuthId", value.toString());
    } catch (error) {
        console.log('Error saving Auth Id:', error);
    }
};

export const removeAuthID = async () => {
    try {
        await AsyncStorage.removeItem("AuthId");
    } catch (error) {
        console.log('Error Removing Auth Id:', error);
    }
};