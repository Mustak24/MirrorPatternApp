import { ThemeSafeArea } from "@/Shared/Stores/Theme/Components";
import HeaderSection from "./UI/HeaderSection";
import OtherInfoSection from "./UI/OtherInfoSection";
import AccountInfoSection from "./UI/AccountInfoSection";

export default function SettingScreen() {
    return (
        <ThemeSafeArea className="w-full h-full px-5" containerProps={{className: 'gap-8'}} >
            <HeaderSection/>
            <AccountInfoSection/>
            <OtherInfoSection/>
        </ThemeSafeArea>
    )
}