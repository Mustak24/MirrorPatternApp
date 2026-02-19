
import ThemeSafeArea from "@/Shared/Stores/Theme/Components/ThemeSafeArea";
import HeaderSection from "./UI/HeaderSection";
import PatterOptionsSection from "./UI/PatternOptionsSection";
import { View } from "react-native";
import PatternSection from "./UI/PatternSection";
import { Provider } from "./Context";


export default function MirrorPatterScreen() {
    return (
        <Provider>
            <ThemeSafeArea 
                className="w-full h-full"
                containerProps={{className: 'h-full'}}
                >
                <HeaderSection/>

                <View className="flex-1 p-5 items-center justify-center" >
                    <PatternSection/>
                </View>
                
                <PatterOptionsSection/>
            </ThemeSafeArea>
        </Provider>
    )
}