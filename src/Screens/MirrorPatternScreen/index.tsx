
import ThemeSafeArea from "@/Shared/Stores/Theme/Components/ThemeSafeArea";
import HeaderSection from "./UI/HeaderSection";
import PatterOptionsSection from "./UI/PatternOptionsSection";
import { View } from "react-native";
import PatternSection from "./UI/PatternSection";
import { MirrorPatternProvider } from "./Store";


export default function MirrorPatterScreen() {
    return (
        <MirrorPatternProvider>
            <ThemeSafeArea 
                className="w-full h-full"
                containerProps={{className: 'h-full'}}
                >
                <HeaderSection/>

                <View className="flex-1 px-5 items-center justify-center" >
                    <PatternSection/>
                </View>
                
                <PatterOptionsSection/>
            </ThemeSafeArea>
        </MirrorPatternProvider>
    )
}