import { Image, View } from "react-native";
import patterns from "../Const/patterns";
import { ThemeView } from "@/Shared/Stores/Theme/Components";
import { useLayoutEffect, useState } from "react";
import { useContext } from "../Context";

export default function PatternSection() {

    const {selectedPattern, imagePath, patternContainerRef} = useContext();
    const {pattern, size: patternSize, id} = patterns[selectedPattern];

    const [size, setSize] = useState(0);

    useLayoutEffect(() => {
        if(patternContainerRef.current) {
            const {width, height} = patternContainerRef.current.getBoundingClientRect();
            const size = Math.min(width, height);
            setSize(size);
        }
    }, []);

    return (
        <View ref={patternContainerRef} className="w-full aspect-square items-center justify-center overflow-hidden">
            <ThemeView color="bg-secondary" className="w-full h-full">
                {
                    pattern.map((rows, index) => (
                        <View key={index} 
                            className="flex-row items-center justify-center gap-0"
                        >
                            {
                                rows.map((flip, index) => (
                                    <Image
                                        key={index} 
                                        source={{uri: imagePath.current}}
                                        width={patternSize[1] === 1 ? size : size / 2}
                                        height={patternSize[0] === 1 ? size : size / 2}

                                        style={{
                                            transform: [
                                                {rotateX: `${flip.x ? 180 : 0}deg`},
                                                {rotateY: `${flip.y ? 180 : 0}deg`}
                                            ]
                                        }}
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