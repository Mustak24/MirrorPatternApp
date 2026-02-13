import { ThemeText, ThemeView } from "@/Shared/Stores/Theme/Components";
import { ThemeViewProps } from "@/Shared/Stores/Theme/Components/ThemeView";
import { IconButton } from "../Buttons";
import ShowWhen from "../../Core/ShowWhen";
import { View } from "react-native";


export type EntityHeaderProps = ThemeViewProps & {
    label?: string,
}


export default function EntityHeader({label, children, className, ...props}: EntityHeaderProps) {
    return (
        <ThemeView {...props} className={`w-full py-5 flex-row items-center gap-2 ${className}`} >
            <View className="flex-row items-center gap-1" >
                <IconButton
                    variant="text"
                    color="text"
                    icon="ChevronLeft"
                    onPress={() => {}}
                    />

                <ShowWhen when={!!label} >
                    <ThemeText className='text-lg font-semibold'>{label}</ThemeText>
                </ShowWhen>
            </View>

            {children}
        </ThemeView>
    )
}