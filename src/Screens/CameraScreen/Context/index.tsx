import { createContext, ReactNode, RefObject, useContext, useRef, useState } from "react";
import { Camera } from "react-native-vision-camera";

const _Context = {
    isFlashOn: false,
    cameraRef: {current: null} as RefObject<Camera | null>,

    toggleFlash: () => {},
}

const Context = createContext(_Context);


function CameraContextProvider({children}: {children: ReactNode}) {
    const [isFlashOn, setIsFlashOn] = useState(false);
    const cameraRef = useRef<Camera>(null);

    const toggleFlash = () => setIsFlashOn(pre => !pre);


    const states = {
        isFlashOn, toggleFlash,
        cameraRef
    }

    return (
        <Context.Provider value={states} >
            {children}
        </Context.Provider>
    )
}

function useCameraContext() {
    return useContext(Context);
}


export {
    CameraContextProvider, 
    useCameraContext
}