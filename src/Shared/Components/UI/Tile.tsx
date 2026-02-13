import { useThemeStore } from "@/Shared/Stores/Theme";
import { ThemeView } from "@/Shared/Stores/Theme/Components";
import { ThemeViewProps } from "@/Shared/Stores/Theme/Components/ThemeView";
import { useEffect } from "react";
import { Animated, useAnimatedValue } from "react-native";


export type TileProps = Omit<ThemeViewProps, 'className' | 'style'> & {
    isActive: boolean,
    width?: number,
    height?: number,
    flip?: {x: boolean, y: boolean}
}

export default function Tile({width=40, height=40, isActive, flip, ...props}: TileProps) {

    const {text, primary, text20, primary20} = useThemeStore(store => ({
        text: store.colors.text, 
        text20: store.colors["text-20"],
        primary: store.colors.primary,
        primary20: store.colors["primary-20"]
    }))

    const rotateAngle = 45;
    const WIDTH = Math.min(width, height) / 5;
    const HEIGHT = 2 * Math.max(width, height);

    const animateBackgroundValue = useAnimatedValue(isActive ? 1 : 0);

    function animateBackground() {
        Animated.spring(animateBackgroundValue, {
            toValue: isActive ? 1 : 0,
            useNativeDriver: true
        }).start()
    }

    useEffect(() => {
        animateBackground();
    }, [isActive])

    return (
        <ThemeView 
            {...props} 
            className='items-center justify-center relative overflow-hidden'
            backgroundColor={
                animateBackgroundValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [text20, primary20]
                })
            }
            
            style={{
                width, height,
                transform: [
                    {rotateX: flip?.x ? '180deg' : '0deg'},
                    {rotateY: flip?.y ? '180deg' : '0deg'}
                ]
            }}
        >
            <ThemeView 
                style={{
                    position: 'absolute',
                    width: WIDTH, 
                    height: HEIGHT,
                    transform: [
                        {rotate: `${rotateAngle}deg`}    
                    ]
                }}

                backgroundColor={
                    animateBackgroundValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [text, primary]
                    })
                }
            />
            
            <ThemeView 
                style={{
                    position: 'absolute',
                    width: WIDTH, 
                    height: HEIGHT, 
                    transform: [
                        {rotate: `${rotateAngle}deg`},
                        {translateX: 2 * WIDTH},
                        {translateY: 2 * WIDTH}      
                    ]
                }}

                backgroundColor={
                    animateBackgroundValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [text, primary]
                    })
                }
            />
        </ThemeView>
    )
}