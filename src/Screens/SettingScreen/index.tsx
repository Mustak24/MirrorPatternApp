import { ThemeSafeArea } from "@/Shared/Stores/Theme/Components";
import HeaderSection from "./UI/HeaderSection";
import OtherInfoSection from "./UI/OtherInfoSection";

export default function SettingScreen() {
    return (
        <ThemeSafeArea className="w-full h-full px-5 gap-6" >
            <HeaderSection/>
            <OtherInfoSection/>
        </ThemeSafeArea>
    )
}