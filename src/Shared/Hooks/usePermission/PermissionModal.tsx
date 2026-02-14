import { CenterModal } from "@/Shared/Components/Core/Modals";
import { CenterModalProps } from "@/Shared/Components/Core/Modals/CenterModal";
import { Button } from "@/Shared/Components/UI/Buttons";
import { ThemeText } from "@/Shared/Stores/Theme/Components";
import { Permission, PermissionsAndroid, PermissionStatus, View } from "react-native";
import getPermissionInfo from "./getPermissionInfo";


export type PermissionModalProps = Omit<CenterModalProps, 'children' | 'preventCloseRequest'> & {
    onDeny: () => void;
    permission: Permission
    permissionStatus: PermissionStatus;
    requestPermission: () => void;
}

export default function PermissionModal({ permission, requestPermission, onDeny, permissionStatus, ...props }: PermissionModalProps) {

    const { description } = getPermissionInfo(permission);

    return (
        <CenterModal {...props}
            preventCloseRequest={true}
            style={{borderRadius: 20, padding: 8}} >
            <View className="gap-6" >
                <View className="items-center w-full gap-2" >
                    <ThemeText className="text-2xl font-semibold" >
                        Permission Required
                    </ThemeText>

                    <ThemeText color="text-secondary" className="text-md text-center px-2" >
                        {description}
                    </ThemeText>
                </View>

                <View className="flex-row gap-2 items-center justify-end w-full" >
                    <Button
                        title={permissionStatus === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN ? 'Settings' : 'Allow'} 
                        onPress={requestPermission} 
                    />

                    <Button 
                        title="Deny" 
                        onPress={onDeny} 
                        variant="outlined" color="text" 
                    />
                </View>
            </View>
        </CenterModal>
    )
}