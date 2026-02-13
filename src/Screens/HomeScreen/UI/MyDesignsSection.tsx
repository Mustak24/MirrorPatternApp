import { Button } from "@/Shared/Components/UI/Buttons";
import { ThemeText, ThemeView } from "@/Shared/Stores/Theme/Components";
import { View } from "react-native";

export default function MyDesignsSection() {
    return (
        <ThemeView className="gap-2" >
            <View className="flex-row items-center gap-2 justify-between" >
                <ThemeText className="text-xl font-bold" >My Designs</ThemeText>

                <Button
                    disabled
                    variant="text"
                    title="See All"
                    onPress={() => { }}
                />
            </View>

            <View className="flex-row gap-4 w-full h-32" >
                <ThemeView color="bg-secondary" className="w-full h-full rounded-[12px] items-center justify-center" >
                    <ThemeText>No Designs Found</ThemeText>
                </ThemeView>
            </View>
        </ThemeView>
    )
}