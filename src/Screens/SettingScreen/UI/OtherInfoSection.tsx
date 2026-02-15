import { APP_SHARE_INFO, GITHUB_URL, PLAY_STORE_URL, PRIVACY_POLICY_URL } from "@/Shared/Assets/Consts/app";
import Icon from "@/Shared/Components/Core/Icon";
import PressableContainer from "@/Shared/Components/UI/Buttons/PressableContainer";
import { useThemeHandlers, useThemeStore } from "@/Shared/Stores/Theme";
import { ThemeText } from "@/Shared/Stores/Theme/Components";
import { Linking, Share, Switch, View } from "react-native";

export default function OtherInfoSection() {

    const {themeMode, primaryColor} = useThemeStore(store => ({
        themeMode: store.theme,
        primaryColor: store.colors.primary,
    }));
    const {toggleTheme} = useThemeHandlers();

    return (
         <View className="w-full gap-4" >
            <ThemeText color="text-secondary" className="text-lg font-bold" >Other Info</ThemeText>

            <PressableContainer color="bg-secondary" className="flex-row items-center gap-4 w-full p-4 rounded-xl" >
                <Icon name="Moon" size={24} color="text" />
                <ThemeText className="text-lg font-bold" >Dark Mode</ThemeText>

                <View className="flex-1 flex-row items-center justify-end" >
                    <Switch 
                        value={themeMode === 'dark'} 
                        trackColor={{false: 'white', true: 'white'}}
                        thumbColor={themeMode === 'dark' ? primaryColor : 'gray'}
                        onValueChange={toggleTheme}
                    />
                </View>
            </PressableContainer>

            <PressableContainer color="primary" className="flex-row items-center gap-4 w-full p-4 rounded-xl" 
                onPress={() => Linking.openURL(PLAY_STORE_URL)}
            >
                <Icon name="Star" size={24} color="primary"  />
                <ThemeText color="primary" className="text-lg font-bold" >
                    Rate us on Google Play Store
                </ThemeText>
            </PressableContainer>

            <PressableContainer color="warning" className="flex-row items-center gap-4 w-full p-4 rounded-xl" 
                onPress={() => Share.share(APP_SHARE_INFO)}
            >
                <Icon name="Share2" size={24} color="warning"  />
                <ThemeText color="warning" className="text-lg font-bold" >
                    Share App
                </ThemeText>
            </PressableContainer>

            <PressableContainer color="bg-secondary" className="flex-row items-center gap-4 w-full p-4 rounded-xl" 
                onPress={() => Linking.openURL(PRIVACY_POLICY_URL)}
            >
                <Icon name="FileText" size={24}/>
                <ThemeText className="text-lg font-bold" >
                    Privacy Policy
                </ThemeText>
            </PressableContainer>

            <PressableContainer color="bg-secondary" className="gap-2 w-full p-4 rounded-xl" 
                onPress={() => Linking.openURL(GITHUB_URL)}
            >
                <ThemeText color="text-secondary" className="text-lg font-bold" >
                    OPEN SOURCE
                </ThemeText>

                <View className="flex-row items-center gap-4" >
                    <Icon name="Github" size={40} />

                    <View>
                        <ThemeText className="text-lg font-bold" >
                            Mirror Pattern is Open Source!
                        </ThemeText>

                        <ThemeText color="text-secondary" >
                            You can find the source code on GitHub
                        </ThemeText>
                    </View>
                </View>
            </PressableContainer>
        </View>
    )
}