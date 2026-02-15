import { navigationRef } from "@/Navigation";
import { Button, IconButton } from "@/Shared/Components/UI/Buttons";
import useImagePicker from "@/Shared/Hooks/useImagePicker";
import usePermission from "@/Shared/Hooks/usePermission";
import { useThemeStore } from "@/Shared/Stores/Theme";
import { ThemeText, ThemeView } from "@/Shared/Stores/Theme/Components";
import { Platform, ToastAndroid, View } from "react-native";
import ImageCropPicker, { openCropper } from "react-native-image-crop-picker";

export default function HeaderSection() {
    return (
        <ThemeView className="w-full gap-5 py-1">
            <View className="flex-row items-center gap-2 justify-between" > 
                <View>
                    <ThemeText color="text" className="text-xl font-bold" >Welcome back,</ThemeText>
                </View>

                <IconButton
                    icon="Settings"
                    color="text"
                    onPress={() => navigationRef.navigate('Setting')}
                />
            </View>

            <ThemeView color="bg-secondary" className="w-full rounded-[16px] p-4 items-start gap-4" >
                <ThemeView color="text-10" className="rounded-full px-4 h-8 items-center flex-row" >
                    <ThemeText>New Pattern</ThemeText>
                </ThemeView>

                <View className="gap-2" >
                    <ThemeText className="text-2xl" >
                        Create Mirror Pattern
                    </ThemeText>
                    <ThemeText color="text-secondary" >
                        Capture texture and transform them into seamless patterns
                    </ThemeText>
                </View>

                <ActionButtons/>
            </ThemeView>
        </ThemeView>
    )
}


function ActionButtons() {

    const textColor = useThemeStore(store => store.colors.text);

    const {openImagePicker, Modal} = useImagePicker((imagePath) => {
        navigationRef.navigate('MirrorPattern', {imagePath});
    });

    return (
        <>
            <Button
                className="w-full"
                startIcon="Camera"
                title="Start With Camera"
                onPress={() => navigationRef.navigate('Camera')}
            />

            <Button
                className="w-full"
                startIcon="ImagePlus"
                title="Continue by Select Image"
                onPress={openImagePicker}
                variant="outlined"
            />

            <Modal/>
        </>
    )
}