import { ThemeView } from "@/Shared/Stores/Theme/Components";
import HeaderSection from "./UI/HeaderSection";
import { SafeAreaView } from "react-native-safe-area-context";
import MyDesignsSection from "./UI/MyDesignsSection";
import ThemeSafeArea from "@/Shared/Stores/Theme/Components/ThemeSafeArea";

export default function HomeScreen() {
    return (
        <ThemeSafeArea 
            className="w-full h-full px-5" 
            containerProps={{className: 'gap-5'}} 
        >
            <HeaderSection/>
            <MyDesignsSection/>
        </ThemeSafeArea>
    )
}