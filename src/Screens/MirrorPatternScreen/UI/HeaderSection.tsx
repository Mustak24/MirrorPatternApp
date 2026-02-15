import { Button } from "@/Shared/Components/UI/Buttons";
import EntityHeader from "@/Shared/Components/UI/Sections/EntityHeader";
import { Platform, View } from "react-native";
import { useContext } from "../Context";
import { captureRef } from "react-native-view-shot";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import usePermission from "@/Shared/Hooks/usePermission";
import { navigationRef } from "@/Navigation";
import PatternPreviewModal from "@/Shared/Components/UI/Modals/PatternPreviewModal";
import { useRef, useState } from "react";



const PERMISSION_NAME = (Platform.OS === 'android' && Platform.Version >= 33) ? (
        'android.permission.READ_MEDIA_IMAGES'
    ) : (
        'android.permission.READ_EXTERNAL_STORAGE'
);

export default function HeaderSection() {

    const {patternContainerRef, isPatternSaving, setIsPatternSaving} = useContext();

    const {Modal, requestPermission: processSave} = usePermission({
        permission: PERMISSION_NAME,
        onGrant: handleSave,
    });

    const previewPatternPath = useRef('');
    const [isPatternPreviewModalVisible, setIsPatternPreviewModalVisible] = useState(false);

    async function handleSave() {
        if(!patternContainerRef.current) return;

        try {
            setIsPatternSaving(true);
            
            const pattern = await captureRef(patternContainerRef, {format: 'jpg', quality: 1});
            
            await CameraRoll.saveAsset(pattern, {
                type: 'photo',
                album: 'Mirror Patterns'
            });
            
            previewPatternPath.current = pattern;
            setIsPatternPreviewModalVisible(true);
        
        } catch(e) {
            console.error('Error during Save Pattern: ', e);
        } finally {
            setIsPatternSaving(false)
        }

    }

    return (
        <EntityHeader
            label="Mirror Patter"
            className="pl-2 pr-5"
        >
            <View className="flex-1 flex-row items-center justify-end" >
                <Button
                    title="Save"
                    rounded={1000}
                    onPress={processSave}
                    loading={isPatternSaving}
                />
            </View>

            <Modal/>
            
            <PatternPreviewModal
                imagePath={previewPatternPath.current}
                visible={isPatternPreviewModalVisible}
                setVisible={setIsPatternPreviewModalVisible}
            />
        </EntityHeader>
    )
}