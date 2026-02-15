import PressableContainer from "@/Shared/Components/UI/Buttons/PressableContainer";
import Tile from "@/Shared/Components/UI/Tile";
import { ThemeText, ThemeView } from "@/Shared/Stores/Theme/Components";
import { Animated, FlatList, useAnimatedValue, View } from "react-native";
import patterns, { PatternInfo } from "../Const/patterns";
import { useContext } from "../Context";


const patternsInfo = Object.entries(patterns);


export default function PatterOptionsSection() {

    const {selectedPattern} = useContext();

    return (
        <ThemeView 
            color="bg-secondary" 
            className="p-5 rounded-tl-2xl rounded-tr-2xl" 
        >
            <View className="gap-2" >
                <View className="flex-row items-center justify-between gap-2" >
                    <ThemeText>Mirror Patters</ThemeText>
                    <ThemeText color="primary" >
                        {selectedPattern}
                        {` (${patterns[selectedPattern].size.join(' x ')} )`}
                    </ThemeText>
                </View>

                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerClassName="items-center gap-5"
                    data={patternsInfo}
                    keyExtractor={item => item[0]}

                    renderItem={({item}) => (
                        <DrawPattern patternInfo={item[1]} size={70} />
                    )}
                />
            </View>
        </ThemeView>
    )
}


function DrawPattern({patternInfo, size}: {patternInfo: PatternInfo, size: number}) {

    const {selectedPattern, setSelectedPattern, isPatternSaving} = useContext();

    const animatedScaleValue = useAnimatedValue(1);

    function startScaleAnimation() {
        Animated.sequence([
            Animated.timing(animatedScaleValue, {
                toValue: 0.9,
                duration: 100,
                useNativeDriver: true
            }),
            Animated.spring(animatedScaleValue, {
                toValue: 1,
                useNativeDriver: true
            })
        ]).start()
    }

    function handleClick() {
        startScaleAnimation();
        setSelectedPattern(patternInfo.id);
    }

    return (
        <Animated.View 
            className="items-center gap-1" 
            style={{transform: [{scale: animatedScaleValue}]}}
        >
            <PressableContainer 
                onPress={handleClick}
                disabled={isPatternSaving}
                color={selectedPattern === patternInfo.id ? 'primary-20' : 'text-20'}
                className="aspect-square w-20 rounded-lg overflow-hidden items-center justify-center gap-0"
            >
                {
                    patternInfo.pattern.map((rows, index) => (
                        <View key={index} 
                            className="flex-row items-center justify-center gap-0"
                        >
                            {
                                rows.map((flip, index) => (
                                    <Tile 
                                        key={index} 
                                        flip={flip}
                                        isActive={selectedPattern === patternInfo.id}
                                        width={patternInfo.size[1] === 1 ? size : size / 2}
                                        height={patternInfo.size[0] === 1 ? size : size / 2}
                                    />
                                ))
                            }
                        </View>
                    ))
                }
            </PressableContainer>

            <ThemeText>
                {patternInfo.id}
            </ThemeText>
        </Animated.View>
    )
}