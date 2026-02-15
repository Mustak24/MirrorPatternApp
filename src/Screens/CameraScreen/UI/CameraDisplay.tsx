import { StyleSheet } from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import { useCameraContext } from "../Context";
import usePermission from "@/Shared/Hooks/usePermission";
import { Fragment } from "react";
import ShowWhen from "@/Shared/Components/Core/ShowWhen";
import { navigationRef } from "@/Navigation";

export default function CameraDisplay() {

    const {cameraRef} = useCameraContext();

    const {permissionStatus, Modal} = usePermission({
        permission: 'android.permission.CAMERA',
        autoRequest: true,
        onDeny: () => {
            if(navigationRef.canGoBack()) 
                    return navigationRef.goBack();
            return navigationRef.navigate('Home');
        },
    })

    const device = useCameraDevices().find(d => d.position === 'back');

    return (
        <Fragment>
            <ShowWhen when={permissionStatus === 'granted'} >
                <Camera
                    ref={cameraRef}
                    device={device!}
                    isActive={true}
                    photo={true}
                    style={StyleSheet.absoluteFill}
                />
            </ShowWhen>

            <Modal/>
        </Fragment>
    )
}