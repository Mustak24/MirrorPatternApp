import { Animated, useAnimatedValue } from "react-native";
import Icon, { IconName, IconProps } from "../Core/Icon";
import { useEffect } from "react";

export type LoaderProps = Omit<IconProps, 'name'> & {
    name?: keyof typeof LOADERS
}

export default function Loader({name = 'LoaderPinwheel', ...props}: LoaderProps) {

    const animatedValue = useAnimatedValue(0);

    useEffect(() => {
        const animation = Animated.loop(
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            })
        )

        animation.start();
        return () => animation.stop();
    }, [])

    return (
        <Animated.View style={{ 
            transform: [
                { 
                    rotate: animatedValue.interpolate({
                        inputRange: [0, 1], outputRange: ['0deg', '360deg']
                    }) 
                }
            ]
        }}>
            { LOADERS[name](props) }
        </Animated.View>
    )

}


const LOADERS = {
    LoaderPinwheel: (props: Omit<IconProps, 'name'>) => <Icon {...props} name="LoaderPinwheel" />,
    LoaderCircle: (props: Omit<IconProps, 'name'>) => <Icon {...props} name="LoaderCircle" />,
    Loader: (props: Omit<IconProps, 'name'>) => <Icon {...props} name="Loader" />,
}