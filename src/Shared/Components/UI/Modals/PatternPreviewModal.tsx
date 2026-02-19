import { useLayoutEffect, useRef, useState } from "react";
import { Dimensions, Image, View } from "react-native";
import { CenterModal } from "../../Core/Modals";
import { CenterModalProps } from "../../Core/Modals/CenterModal";
import { IconButton } from "../Buttons";
import { ThemeView } from "@/Shared/Stores/Theme/Components";
import Share from "react-native-share";
import RNFS from 'react-native-fs';
import getPatternDimensions from "@/Shared/Utils/getPatternDimensions";


const SCREEN_HEIGHT = Dimensions.get('window').height - 220;
const SCREEN_WIDTH = Dimensions.get('window').width - 20;


export type PatternPreviewModalProps = Omit<CenterModalProps, 'children'> & {
    path: string;
    width: number;
    height: number;
}

export default function PatternPreviewModal({path, width, height, ...props}: PatternPreviewModalProps) {

    const [isShareLoading, setIsShareLoading] = useState(false);
    const [dimensions, setDimensions] = useState<{width?: number, height?: number}>({
        width: undefined, height: undefined
    });
    const containerRef = useRef<View>(null);

    async function handleShare() {
        try {
            setIsShareLoading(true);

            const destPath = `${RNFS.CachesDirectoryPath}/shared_pattern.jpg`;
            await RNFS.copyFile(path, destPath);

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

    useLayoutEffect(() => {
        const size = getPatternDimensions({
            MAX_WIDTH: SCREEN_WIDTH,
            MAX_HEIGHT: SCREEN_HEIGHT,
            aspectRatio: width / height,
            patternSize: [1, 1],
        });
        
        setDimensions(size);
    }, [path])

    return (
        <CenterModal {...props}>
            <View className="w-full items-center justify-center rounded-[8px] overflow-hidden" >
                <View>
                    <Image source={{uri: path}} 
                        width={dimensions.width}
                        height={dimensions.height}
                    />
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