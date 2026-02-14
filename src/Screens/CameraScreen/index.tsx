import { ThemeText, ThemeView } from "@/Shared/Stores/Theme/Components";
import CameraWindow from "./UI/CameraWindow";
import CameraDisplay from "./UI/CameraDisplay";
import { CameraContextProvider } from "./Context";

export default function CameraScreen() {
    return (
        <CameraContextProvider>
            <CameraWindow>
                <CameraDisplay />
            </CameraWindow>
        </CameraContextProvider>
    )
}