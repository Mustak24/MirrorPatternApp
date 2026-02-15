import { navigationRef } from "@/Navigation";
import Icon from "@/Shared/Components/Core/Icon";
import { IconButton } from "@/Shared/Components/UI/Buttons";
import { useThemeStore } from "@/Shared/Stores/Theme";
import { ThemeText, ThemeView } from "@/Shared/Stores/Theme/Components";
import { ReactNode } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCameraContext } from "../Context";
import { openCropper } from "react-native-image-crop-picker";


export default function CameraWindow({children}: {children: ReactNode}) {

    const textColor = useThemeStore(store => store.colors.text);

    const {isFlashOn, cameraRef, toggleFlash} = useCameraContext();

    async function takePicture() {   
        if(!cameraRef.current) return;

        const photo = await cameraRef.current.takePhoto({
            flash: isFlashOn ? "on" : "off",
        })

        try {
            const cropImage = await openCropper({
                cropperToolbarTitle: "Crop Image",
                mediaType: "photo",
                path: `file://${photo.path}`,
                cropperTintColor: textColor,
                compressImageQuality: 1,
                width: 400,
                height: 400,
            })

            navigationRef.navigate("MirrorPattern", {imagePath: cropImage.path})
        } catch(e) {
            console.error('crop error', e);
        }
    }

    return (
        <ThemeView className="flex-1 w-full h-full relative" >
            {children}

            <SafeAreaView className="absolute top-0 left-0 flex-1 w-full h-full bg-transparent px-5 pt-1 pb-5" >
                <View className="w-full flex-row items-center justify-between gap-5" >
                    <IconButton
                        icon="X"
                        variant="soft"
                        color="text"
                        onPress={() => navigationRef.goBack()}
                    />

                    <ThemeView color="text-10" className="h-10 flex-row items-center gap-2 rounded-full px-5" >
                        <Icon name="Focus" />

                        <ThemeText>
                            use give square size frame
                        </ThemeText>
                    </ThemeView>

                    <IconButton
                        icon={isFlashOn ? "Zap" : "ZapOff"}
                        variant="soft"
                        color="text"
                        onPress={toggleFlash}
                    />
                </View>

                <View className="flex-1 w-full items-center justify-center" >
                    <View className="relative w-full aspect-square items-center justify-center" style={{borderColor: textColor, zIndex: -1}} >

                        <ThemeView color="bg-secondary-50" className="absolute w-full h-screen bottom-full" />
                        <ThemeView color="bg-secondary-50" className="absolute w-full h-screen top-full" />
                        <ThemeView color="bg-secondary-50" className="absolute w-screen h-screen left-full" />
                        <ThemeView color="bg-secondary-50" className="absolute w-screen h-screen right-full" />

                    </View>
                </View>

                <View className="w-full flex-row items-center justify-center" >
                    <IconButton
                        size={60}
                        icon="Camera"
                        variant="outlined"
                        color="text"

                        onPress={takePicture}
                    />
                </View>
            </SafeAreaView>
        </ThemeView>
    )
}