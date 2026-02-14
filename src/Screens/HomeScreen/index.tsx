import HeaderSection from "./UI/HeaderSection";
import MyDesignsSection from "./UI/MyDesignsSection";
import ThemeSafeArea from "@/Shared/Stores/Theme/Components/ThemeSafeArea";

export default function HomeScreen() {
    return (
        <ThemeSafeArea 
            className="flex-1 w-full h-full px-5" 
            containerProps={{className: 'gap-6 flex-1 relative'}} 
        >
            <HeaderSection/>
            <MyDesignsSection/>
        </ThemeSafeArea>
    )
}