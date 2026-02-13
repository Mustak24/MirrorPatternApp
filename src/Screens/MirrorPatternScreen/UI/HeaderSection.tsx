import { Button } from "@/Shared/Components/UI/Buttons";
import EntityHeader from "@/Shared/Components/UI/Sections/EntityHeader";
import { View } from "react-native";

export default function HeaderSection() {
    return (
        <EntityHeader
            label="Mirror Patter"
            className="pl-2 pr-5"
        >
            <View className="flex-1 flex-row items-center justify-end" >
                <Button
                    title="Save"
                    rounded={1000}
                />
            </View>
        </EntityHeader>
    )
}