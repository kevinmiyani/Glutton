import { StyleSheet, ScrollView, Alert, Modal, } from 'react-native'
import React, { useState } from 'react'
import { NormalSnackBar } from '../constants/SnackBars';
import { useDispatch, useSelector } from 'react-redux';
import ScreenHeader from '../components/ScreenHeader';
import { GRADIENTCOLOR } from '../constants/Colors';
import PackageCardComponent from '../components/PackageCardComponent';
import FloatingAddButton from '../components/buttons/FloatingAddButton';
import AddNewPackageModal from '../components/modals/AddNewPackageModal';
import { addPackageAPI, removePackageAPI } from '../api/utils';
import { FetchPackagesData } from '../redux/PackagesAction';

const PackagesScreen = ({ navigation }) => {
    const packages = useSelector(state => state.PackagesReducer);
    const [isModalVisible, setModalVisible] = useState(false);
    const [packageName, setPackageName] = useState('');
    const [duration, setDuration] = useState('');
    const [price, setPrice] = useState('');
    const [upload, setUpload] = useState(false);
    const dispatch = useDispatch();

    const Submit = async () => {
        try {
            setUpload(true);
            let data = {};
            data['packageName'] = packageName.trimEnd();
            data['price'] = parseInt(price);
            data['duration'] = parseInt(duration);
            const res = await addPackageAPI(data);
            if (res?.data?.data) {
                CloseModal();
                NormalSnackBar('Package Added.');
                const updatedData = [res?.data?.data, ...packages];
                dispatch(FetchPackagesData(updatedData));
            } else {
                NormalSnackBar('Something wents wrong.');
            }
            setUpload(false);
        } catch (e) {
            console.log(e);
            setUpload(false);
        }
    }

    const RemovePackage = async (id) => {
        try {
            const res = await removePackageAPI(id);
            if (res?.data?.data) {
                NormalSnackBar('Package Removed.');
                dispatch(FetchPackagesData(packages?.filter((pkg) => pkg._id != id)));
            } else {
                NormalSnackBar('Something wents wrong.');
            }
        } catch (e) {
            console.log(e);
        }
    }

    const CloseModal = () => {
        setModalVisible(false)
        setPackageName('');
        setDuration('');
        setPrice('');
    }

    return (
        <ScreenHeader
            navigation={navigation}
            title={'Packages'}
        >
            <ScrollView
                contentContainerStyle={styles.ContentContainer}
                showsVerticalScrollIndicator={false}
            >
                {
                    packages.map((pkg, i) => {
                        return (
                            <PackageCardComponent
                                key={i}
                                data={pkg}
                                colors={i % 2 == 0 ? GRADIENTCOLOR.ORANGE_100_100 : GRADIENTCOLOR.BLACK_50_100_100_100}
                                onPress={() => {
                                    Alert.alert(
                                        pkg['packageName'],
                                        'Are you sure, you want to remove this package ?',
                                        [
                                            { text: 'No', onPress: () => { } },
                                            { text: 'Yes', onPress: () => { RemovePackage(pkg._id) } },
                                        ],
                                    )
                                }}
                            />
                        )
                    })
                }
            </ScrollView>

            <FloatingAddButton
                onPress={() => {
                    setModalVisible(true);
                }}
            />

            <Modal
                animationType='fade'
                transparent visible={isModalVisible}
                statusBarTranslucent
                onRequestClose={CloseModal}
            >
                <AddNewPackageModal
                    packageName={packageName}
                    setPackageName={setPackageName}
                    price={price}
                    setPrice={setPrice}
                    duration={duration}
                    setDuration={setDuration}
                    onSubmit={() => {
                        if (packageName == '') {
                            NormalSnackBar('Please Fill Package Name.');
                        } else if (price == '') {
                            NormalSnackBar('Please Fill Price.');
                        } else if (parseInt(price) <= 0) {
                            NormalSnackBar('Price must be greater than 0.');
                        } else if (duration == '') {
                            NormalSnackBar('Please Fill Duration.');
                        } else if (parseInt(duration) <= 0) {
                            NormalSnackBar('Minimum duration is 1 Month.');
                        } else {
                            Submit();
                        }
                    }}
                    onClose={CloseModal}
                    upload={upload}
                />
            </Modal>

        </ScreenHeader>
    )
}

export default PackagesScreen

const styles = StyleSheet.create({
    ContentContainer: {
        paddingTop: 55,
        paddingHorizontal: 15,
        width: '100%',
    },
})