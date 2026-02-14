import { ThemeText, ThemeView } from "@/Shared/Stores/Theme/Components";
import { ThemeViewProps } from "@/Shared/Stores/Theme/Components/ThemeView";
import { IconButton } from "../Buttons";
import ShowWhen from "../../Core/ShowWhen";
import { View } from "react-native";
import { navigationRef } from "@/Navigation";
import { RootStackParamList } from "@/Navigation/StackNavigators/Root/types";


export type EntityHeaderProps = ThemeViewProps & {
    label?: string
}


export default function EntityHeader({label, children, className, ...props}: EntityHeaderProps) {

    function handleGoBack() {
        if(navigationRef.canGoBack()) {
            navigationRef.goBack()
        }
        navigationRef.navigate('Home');
    }

    return (
        <ThemeView {...props} className={`w-full py-5 flex-row items-center gap-2 ${className}`} >
            <View className="flex-row items-center gap-1" >
                <IconButton
                    variant="text"
                    color="text"
                    icon="ChevronLeft"
                    onPress={handleGoBack}
                    />

                <ShowWhen when={!!label} >
                    <ThemeText className='text-xl font-bold'>{label}</ThemeText>
                </ShowWhen>
            </View>

            {children}
        </ThemeView>
    )
}