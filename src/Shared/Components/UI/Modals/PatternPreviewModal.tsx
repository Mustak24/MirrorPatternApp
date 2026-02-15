import { Image, View } from "react-native";
import { CenterModal } from "../../Core/Modals";
import { CenterModalProps } from "../../Core/Modals/CenterModal";
import { Button } from "../Buttons";


export type PatternPreviewModalProps = Omit<CenterModalProps, 'children'> & {
    imagePath: string;
}

export default function PatternPreviewModal({imagePath, setVisible, ...props}: PatternPreviewModalProps) {
    return (
        <CenterModal {...props} setVisible={setVisible}>
            <View className="w-full gap-5" >
                <View className="w-full aspect-square rounded-[8px] overflow-hidden" >
                    <Image source={{uri: imagePath}} className="w-full h-full object-cover" />
                </View>

                <View className="flex-row items-center justify-end gap-4" >
                    <Button
                        title="Share"
                        startIcon="Share2"
                        color="primary"
                        rounded={8}
                    />

                    <Button
                        title="Close"
                        color="text"
                        onPress={() => setVisible(false)}
                        rounded={8}
                    />
                </View>
            </View>
        </CenterModal>
    )
}