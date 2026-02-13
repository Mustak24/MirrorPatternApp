import { SafeAreaView, SafeAreaViewProps } from "react-native-safe-area-context";
import ThemeView, { ThemeViewProps } from "./ThemeView";


export type ThemeSafeAreaProps = ThemeViewProps & {
    containerProps?: SafeAreaViewProps
}

export default function ThemeSafeArea({children, containerProps, ...props}: ThemeSafeAreaProps) {
    return (
        <ThemeView {...props} >
            <SafeAreaView {...containerProps} >
                {children}
            </SafeAreaView>
        </ThemeView>
    )
}