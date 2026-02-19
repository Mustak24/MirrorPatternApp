import { Platform, ToastAndroid } from "react-native";
import usePermission from "./usePermission";
import { Image, openCropper, openPicker } from "react-native-image-crop-picker";
import { useThemeStore } from "../Stores/Theme";



export const MEDIA_PERMISSION_NAME = (Platform.OS === 'android' && Platform.Version >= 33) ? (
        'android.permission.READ_MEDIA_IMAGES'
    ) : (
        'android.permission.READ_EXTERNAL_STORAGE'
);

export default function useImagePicker(onPick: (image: Image) => void) {

    const textColor = useThemeStore(store => store.colors.text);

    const {requestPermission: openImagePicker, Modal} = usePermission({
        permission: MEDIA_PERMISSION_NAME,
        onGrant: _openImagePicker
    });


    async function _openImagePicker() {
        try {
            const image = await openPicker({
                mediaType: 'photo',
                compressImageQuality: 1
            })

            const cropImage = await openCropper({
                cropperToolbarTitle: 'Crop Image',
                cropperTintColor: textColor,
                path: image.path,
                mediaType: 'photo',
                compressImageQuality: 1,
                freeStyleCropEnabled: true,
                showCropGuidelines: true,
            })


            if(cropImage.path) {
                onPick(cropImage);
                return;
            }
            
            ToastAndroid.showWithGravity(
                'Image not selected',
                ToastAndroid.BOTTOM,
                ToastAndroid.SHORT
            )

        } catch(e) {
            console.error('Error in continue by image', e)
        }
    }


    return {
        openImagePicker,
        Modal
    }
}