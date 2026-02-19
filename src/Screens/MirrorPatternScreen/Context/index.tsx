import { RootStackParamList } from "@/Navigation/StackNavigators/Root/types";
import { RouteProp, useRoute } from "@react-navigation/native";
import { createContext, ReactNode, RefObject, useContext as _useContext, useRef, useState, Dispatch, SetStateAction } from "react";
import { Patterns } from "../Const/patterns";
import { View } from "react-native";
import { Image } from "react-native-image-crop-picker";


const _CONTEXT = {
    imageInfo: {current: {} as Image} as RefObject<Image>,
    
    selectedPattern: '2T-1' as Patterns,
    setSelectedPattern: (() => {}) as Dispatch<SetStateAction<Patterns>>,
    
    patternContainerRef: {current: null} as RefObject<View | null>,

    isPatternSaving: false,
    setIsPatternSaving: (() => {}) as Dispatch<SetStateAction<boolean>>,
}

const Context = createContext(_CONTEXT);


function Provider({children}: {children: ReactNode}) {

    const _imageInfo = useRoute<RouteProp<RootStackParamList, 'MirrorPattern'>>().params;

    const imageInfo = useRef(_imageInfo);
    const patternContainerRef = useRef<View | null>(null);

    const [selectedPattern, setSelectedPattern] = useState<Patterns>(_CONTEXT.selectedPattern);
    const [isPatternSaving, setIsPatternSaving] = useState(false);

    const states = {
        imageInfo,
        
        selectedPattern,
        setSelectedPattern,
        
        patternContainerRef,

        isPatternSaving,
        setIsPatternSaving
    }

    return (
        <Context.Provider value={states}>
            {children}
        </Context.Provider>
    )
}


function useContext() {
    return _useContext(Context);
}


export {
    Provider,
    useContext
}