import { useCallback, useState } from "react";
import { Linking, Permission, PermissionsAndroid, PermissionStatus, Platform } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import PermissionModal from "./PermissionModal";



export type usePermissionProps = {
    permission: Permission;
    onDeny?: () => void;
    autoRequest?: boolean;
    onGrant?: () => void;

}


export default function usePermission({ permission, autoRequest = false, onDeny, onGrant }: usePermissionProps) {
    
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>(PermissionsAndroid.RESULTS.DENIED);


    async function requestPermission() {
        if(Platform.OS !== 'android') return;

        try {
            const result = await PermissionsAndroid.request(permission);
            setPermissionStatus(result);

            handlePermission(result);
        } catch (error) {
            console.log(error);
            setIsModalVisible(false);
        }
    }


    function handlePermission(result: PermissionStatus) {
        switch (result) {
            case PermissionsAndroid.RESULTS.GRANTED:
                onGrant?.();
                return setIsModalVisible(false);

            case PermissionsAndroid.RESULTS.DENIED:
                return setIsModalVisible(true);

            case PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN: 
                return isModalVisible ? Linking.openSettings() : setIsModalVisible(true);
        }
    }


    function Modal() {

        function handleDeny() {
            if(onDeny) return onDeny();
            setIsModalVisible(false);
        }

        return (
            <PermissionModal
                visible={isModalVisible}
                setVisible={setIsModalVisible}
    
                permission={permission}
                permissionStatus={permissionStatus}
                requestPermission={requestPermission}
            
                onDeny={handleDeny}
            />
        )
    }

    
    useFocusEffect(useCallback(() => {
        if(autoRequest && permissionStatus === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            requestPermission();
        }
    }, []))


    return {
        requestPermission,
        Modal
    }   
}