import { View } from "react-native";
import patterns from "../Const/patterns";
import { ThemeView } from "@/Shared/Stores/Theme/Components";
import { useMirrorPatternStore } from "../Store";
import Tile from "@/Shared/Components/UI/Tile";
import { useLayoutEffect, useRef, useState } from "react";

export default function PatternSection() {

    const selectPattern = useMirrorPatternStore(s => s.selectPattern);
    const {pattern, size: patternSize, id} = patterns[selectPattern];

    const [size, setSize] = useState(0);
    const container = useRef<View>(null);

    useLayoutEffect(() => {
        if(container.current) {
            const {width, height} = container.current.getBoundingClientRect();
            const size = Math.min(width, height);
            setSize(size);
        }
    }, []);

    return (
        <View ref={container} className="w-full aspect-square items-center justify-center rounded-2xl overflow-hidden">
            <ThemeView color="bg-secondary" className="w-full h-full">
                {
                    pattern.map((rows, index) => (
                        <View key={index} 
                            className="flex-row items-center justify-center gap-0"
                        >
                            {
                                rows.map((flip, index) => (
                                    <Tile
                                        key={index} 
                                        flip={flip}
                                        isActive={selectPattern === id}
                                        width={patternSize[1] === 1 ? size : size / 2}
                                        height={patternSize[0] === 1 ? size : size / 2}
                                    />
                                ))
                            }
                        </View>
                    ))
                }
            </ThemeView>
        </View>
    )
}