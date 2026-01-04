import { StyleSheet, Text, View, TouchableOpacity, Modal, Platform, TextInput, Dimensions, } from 'react-native'
import React, { useState, } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import { ScrollView } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import { CheckPermission } from '../constants/AppPermimssions';
import { PERMISSIONS } from 'react-native-permissions';
import { NormalSnackBar } from '../constants/SnackBars';
import ScreenHeader from '../components/ScreenHeader';
import ColorPickerComponent from '../components/ColorPickerComponent';
import { COLOR, GRADIENTCOLOR } from '../constants/Colors';
import { Elevation_10, Elevation_2, Elevation_5 } from '../constants/Elevation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MenuCategoryModal from '../components/modals/MenuCategoryModal';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { addMenuCategoryAPI, updateMenuCategoryByIdAPI } from '../api/utils';
import socketServices from '../api/Socket';

const { height, width } = Dimensions.get('screen');

const ManageCategoryScreen = ({ navigation, route }) => {

    const categories = useSelector(state => state.CategoryReducer);
    const isUpdate = route.params ? true : false;
    const [image, setImage] = useState('');
    const [catName, setCatName] = useState(isUpdate ? route.params.data?.name : '');
    const [fontColor, setFontColor] = useState(isUpdate ? route.params.data?.fontColor : COLOR.BLACK);
    const [isModalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const selectImage = async () => {
        try {
            const granted = Platform.OS == 'ios' ? await CheckPermission(PERMISSIONS.IOS.PHOTO_LIBRARY) : await CheckPermission(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES)
            if (granted == true) {
                ImagePicker.openPicker({
                    width: 1080,
                    height: 1920,
                    cropping: true,
                    compressImageQuality: 0.5
                }).then(image => {
                    setImage(image.path);
                }).catch((e) => { console.log(e) });
            }
        } catch (err) {
            console.warn(err)
        }
    }

    const uploadImage = async () => {
        if (image == '') {
            return null;
        }
        const uploadUri = image;
        let filename = catName;

        const storageRef = storage().ref(`Menu_Card_Category/${filename}`)
        const task = storageRef.putFile(uploadUri);
        task.on('state_changed', taskSnapshot => {
            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
        });

        try {
            await task
            const uri = storageRef.getDownloadURL()
            return uri;
        } catch (e) {
            console.log(e);
            return null;
        }
    }


    const onUpdate = async () => {
        try {
            setLoading(true)
            let imageUri = await uploadImage();
            if (imageUri == null) {
                imageUri = route.params.data?.img;
            }
            const data = {};

            data['fontColor'] = fontColor;
            data['img'] = imageUri;

            const res = await updateMenuCategoryByIdAPI(route?.params?.data?._id, data);

            if (res?.data?.data) {
                socketServices.emit('MenuCategoryUpdate', res?.data?.data);
                setModalVisible(false);
                NormalSnackBar('Category Updated.');
                navigation.pop(1);
            } else {
                NormalSnackBar('Something wents wrong.');
            }

            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.log(e);
        }
    }

    const onAdd = async () => {
        try {
            setLoading(true)
            const imageUri = await uploadImage();
            const data = {};
            data['name'] = catName?.trim();
            data['fontColor'] = fontColor;
            data['img'] = imageUri;

            const res = await addMenuCategoryAPI(data);

            if (res?.data?.data) {
                socketServices.emit('MenuCategoryUpdate', res?.data?.data);
                setModalVisible(false);
                NormalSnackBar('Category Added.');
                navigation.pop(1);
            } else {
                NormalSnackBar('Something wents wrong.');
            }

            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.log(e);
        }
    }

    return (
        <>
            <ScreenHeader
                title={isUpdate ? catName : 'Add New Category'}
                navigation={navigation}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.Container}
                    contentContainerStyle={styles.ContentContainer}
                >
                    {
                        isUpdate == false &&
                        <View
                            style={[styles.CategoryNameContainer, Elevation_2]}
                        >
                            <Text style={styles.CategoryNameText} numberOfLines={1}>Category Name</Text>
                            <TextInput
                                style={styles.CategoryTextInput}
                                placeholder="Category"
                                placeholderTextColor={COLOR.GRAY}
                                keyboardType='default'
                                onChangeText={setCatName}
                                value={catName}
                                maxLength={30}
                            />
                        </View>
                    }

                    <View
                        style={[styles.ImageContainer, Elevation_5]}
                    >
                        {
                            (image || isUpdate) ?
                                <FastImage
                                    source={{ uri: image ? image : route.params.data?.img }}
                                    style={styles.Image}
                                    resizeMode='cover'
                                />
                                :
                                <TouchableOpacity
                                    style={[Elevation_5, { shadowColor: COLOR.ORANGE }]}
                                    onPress={selectImage}
                                >
                                    <Ionicons name={'add-circle'} size={50} color={COLOR.ORANGE} />
                                </TouchableOpacity>
                        }

                        {(image || isUpdate) && <Text style={[styles.CatName, { color: fontColor, }]} numberOfLines={1}>{catName}</Text>}
                        {
                            (image || isUpdate) &&
                            <TouchableOpacity
                                style={[styles.ChangeButton, Elevation_5]}
                                onPress={selectImage}
                            >
                                <MaterialIcons name='change-circle' size={40} color={COLOR.ORANGE} />
                            </TouchableOpacity>
                        }
                    </View>

                    <ColorPickerComponent
                        value={fontColor}
                        onChange={({ rgba }) => { setFontColor(rgba) }}
                    />

                    <TouchableOpacity
                        style={[styles.SaveButton, Elevation_10, { shadowColor: COLOR.ORANGE }]}
                        onPress={() => {
                            if (isUpdate) {
                                setModalVisible(true)
                            } else {
                                if (catName == '') {
                                    NormalSnackBar('Fill Category Name.');
                                } else if (image == '') {
                                    NormalSnackBar('Select Menu Card.');
                                } else if (fontColor == 'rgba(0,0,0,0)') {
                                    NormalSnackBar('Select Item Font Color.');
                                } else {
                                    setCatName(catName.trimEnd());
                                    if (categories.some(o => o.name.toLocaleLowerCase() === catName.trimEnd().toLocaleLowerCase())) {
                                        NormalSnackBar("This category name is already exists.");
                                    } else {
                                        setModalVisible(true)
                                    }
                                }
                            }
                        }}
                    >
                        <LinearGradient
                            colors={GRADIENTCOLOR.ORANGE_100_100}
                            style={styles.SaveButtonGradient}
                            angle={150}
                            useAngle
                        >
                            <Text style={styles.SaveText}>Save</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </ScrollView>
            </ScreenHeader>
            {
                isModalVisible &&
                <View style={[styles.viewWrapper]}>
                    <MenuCategoryModal
                        image={(image || isUpdate) && (image ? image : route.params.data.img)}
                        catName={catName}
                        fontColor={fontColor}
                        loading={loading}
                        onClose={() => { setModalVisible(false) }}
                        onSubmit={() => { isUpdate ? onUpdate() : onAdd() }}
                        isUpdate={isUpdate}
                    />
                </View>
            }
        </>
    )
}

export default ManageCategoryScreen

const styles = StyleSheet.create({
    viewWrapper: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#00000050",
        padding: 30,
        width: width,
        height: height,
        position: 'absolute',
        zIndex: 1000,
    },
    Container: {
        flex: 1,
    },
    ContentContainer: {
        paddingBottom: 15,
        paddingTop: 55,
        paddingHorizontal: 15,
        width: '100%',
        alignItems: 'center',
    },
    CategoryNameContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.BORDERCOLOR,
        backgroundColor: COLOR.WHITE,
        marginBottom: 15,
    },
    CategoryNameText: {
        color: COLOR.BLACK,
        fontSize: 13,
    },
    CategoryTextInput: {
        flex: 1,
        borderRadius: 13,
        height: 40,
        color: COLOR.BLACK,
        backgroundColor: COLOR.BORDERCOLOR,
        fontSize: 12,
        paddingVertical: 5,
        paddingHorizontal: 15,
        marginLeft: 20,
    },
    ImageContainer: {
        width: '80%',
        aspectRatio: 1 / 1.77777778,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR.WHITE,
    },
    Image: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
        position: 'absolute',
        zIndex: -10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    CatName: {
        fontSize: 17,
        paddingHorizontal: 30,
        fontWeight: '700',
    },
    ChangeButton: {
        position: 'absolute',
        bottom: 15,
        right: 15,
        borderRadius: 30,
        backgroundColor: COLOR.WHITE,
    },
    SaveButton: {
        width: '100%',
        height: 40,
        backgroundColor: COLOR.WHITE,
        borderRadius: 15,
        marginTop: 20,
    },
    SaveButtonGradient: {
        alignItems: 'center',
        borderRadius: 15,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    SaveText: {
        color: COLOR.WHITE,
        fontSize: 13,
        fontWeight: '600',
    },
})