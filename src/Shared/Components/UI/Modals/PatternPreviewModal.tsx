import { useState } from "react";
import { Image, View } from "react-native";
import { CenterModal } from "../../Core/Modals";
import { CenterModalProps } from "../../Core/Modals/CenterModal";
import { IconButton } from "../Buttons";
import { ThemeView } from "@/Shared/Stores/Theme/Components";
import Share from "react-native-share";
import RNFS from 'react-native-fs';


export type PatternPreviewModalProps = Omit<CenterModalProps, 'children'> & {
    imagePath: string;
}

export default function PatternPreviewModal({imagePath, ...props}: PatternPreviewModalProps) {

    const [isShareLoading, setIsShareLoading] = useState(false);

    async function handleShare() {
        try {
            setIsShareLoading(true);

            const destPath = `${RNFS.CachesDirectoryPath}/shared_pattern.jpg`;
            await RNFS.copyFile(imagePath, destPath);

            const url = `file://${destPath}`;
            await Share.open({
                url,
                type: 'image/*',
                failOnCancel: false,
                
            });

        } catch(e) {
            console.error('Error during share pattern: ', e)
        } finally {
            setIsShareLoading(false);
        }
    }

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
                        onPress={handleShare}
                        loading={isShareLoading}
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