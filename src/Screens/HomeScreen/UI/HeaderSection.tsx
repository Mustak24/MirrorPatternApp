import { navigationRef } from "@/Navigation";
import { Button } from "@/Shared/Components/UI/Buttons";
import usePermission from "@/Shared/Hooks/usePermission";
import { ThemeText, ThemeView } from "@/Shared/Stores/Theme/Components";
import { View } from "react-native";

export default function HeaderSection() {

    const { Modal, requestPermission } = usePermission({
        permission: 'android.permission.CAMERA',
        autoRequest: false,
        onGrant: () => {
            navigationRef.navigate('Camera');
        }
    })

    return (
        <ThemeView className="w-full gap-4">
            <View>
                <ThemeText color="text-secondary" >Welcome back,</ThemeText>
                <ThemeText className="text-xl font-bold" >Mustak24</ThemeText>
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

                <Button
                    className="w-full"
                    startIcon="Camera"
                    title="Start With Camera"
                    onPress={requestPermission}
                />
            </ThemeView>

            <Modal/>
        </ThemeView>
    )
}