import Icon from "@/Shared/Components/Core/Icon";
import EntityHeader from "@/Shared/Components/UI/Sections/EntityHeader";
import { ThemeText } from "@/Shared/Stores/Theme/Components";
import { useEffect } from "react";
import { Animated, useAnimatedValue, View } from "react-native";

export default function HeaderSection() {

    const animatedValue = useAnimatedValue(0.95);

    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(animatedValue, {
                    toValue: 1.1,
                    duration: 300,
                    useNativeDriver: true,
                }),

                Animated.timing(animatedValue, {
                    toValue: 0.95,
                    duration: 400,
                    useNativeDriver: true,
                })
            ])
        );

        animation.start();
        return () => animation.stop();
    }, [])

    return (
        <EntityHeader label="Settings" >
            <View className="flex-1 flex-row items-center justify-end gap-2" >
                <ThemeText className="font-semibold" >
                    Build With
                </ThemeText>

                <Animated.View style={{ transform: [{ scale: animatedValue }] }} >
                    <Icon name="Heart" color="error" />
                </Animated.View>
                
                <ThemeText className="font-semibold" >
                    by @Mustak24
                </ThemeText>
            </View>
        </EntityHeader>
    )
}