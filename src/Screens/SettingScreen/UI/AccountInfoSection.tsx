import { View } from "react-native";
import ThemeText from "@/Shared/Stores/Theme/Components/ThemeText";
import PressableContainer from "@/Shared/Components/UI/Buttons/PressableContainer";
import Icon from "@/Shared/Components/Core/Icon";
import { useAppStore } from "@/Shared/Stores/App";
import UserNameModal from "@/Shared/Components/UI/Modals/UserNameModal";
import { useState } from "react";
import useUpdateEffect from "@/Shared/Hooks/useUpdateEffect";

export default function AccountInfoSection() {

    const userName = useAppStore(store => store.userName);

    const [isModalVisible, setIsModalVisible] = useState(false);

    useUpdateEffect(() => {
        setIsModalVisible(true);
    }, [userName])

    return (
        <View className="w-full gap-4" >
            <ThemeText color="text-secondary" className="text-lg font-bold" >Account Info</ThemeText>

            <PressableContainer color="bg-secondary" className="gap-2 w-full p-4 rounded-xl" 
                onPress={() => setIsModalVisible(true)}
            >
                <ThemeText color="text-secondary" >Name</ThemeText>

                <View className="flex-row items-center gap-2" >
                    <Icon name="User" size={24} color="text" />
                    <ThemeText className="text-lg font-bold" >{userName}</ThemeText>
                </View>
            </PressableContainer>

            <UserNameModal
                type="UPDATE"
                visible={isModalVisible}
                setVisible={setIsModalVisible}
            />
        </View>
    )
}