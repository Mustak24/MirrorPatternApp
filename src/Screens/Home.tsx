import { ThemeText, ThemeView } from "@/Shared/Stores/Theme/Components";


export default function HomeScreen() {
    return (
        <ThemeView className="h-full w-full items-center justify-center" >
            <ThemeText className="text-4xl font-bold">Happy Coding</ThemeText>
        </ThemeView>    
    )
}