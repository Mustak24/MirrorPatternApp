import { StyleSheet } from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import { useCameraContext } from "../Context";

export default function CameraDisplay() {

    const {cameraRef} = useCameraContext();

    const device = useCameraDevices().find(d => d.position === 'back');

    return (
        <Camera
            ref={cameraRef}
            device={device!}
            isActive={true}
            photo={true}
            style={StyleSheet.absoluteFill}
        />
    )
}