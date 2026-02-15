import { Image, View } from "react-native";
import { CenterModal } from "../../Core/Modals";
import { CenterModalProps } from "../../Core/Modals/CenterModal";
import { IconButton } from "../Buttons";
import { ThemeView } from "@/Shared/Stores/Theme/Components";


export type PatternPreviewModalProps = Omit<CenterModalProps, 'children'> & {
    imagePath: string;
}

export default function PatternPreviewModal({imagePath, ...props}: PatternPreviewModalProps) {
    return (
        <CenterModal {...props}>
            <View className="w-full gap-5" >
                <View className="w-full aspect-square rounded-[8px] overflow-hidden" >
                    <Image source={{uri: imagePath}} className="w-full h-full object-cover" />
                </View>

                <ThemeView color="bg-80" className="absolute top-[2px] right-[2px] flex-row items-center justify-end gap-2 rounded-[8px] p-1" >
                    <IconButton
                        icon="Share2"
                        color="primary"
                        rounded={4}
                    />

                    <IconButton
                        icon="X"
                        color="text"
                        rounded={4}
                        onPress={() => props.setVisible(false)}
                        
                    />
                </ThemeView>
            </View>
        </CenterModal>
    )
}