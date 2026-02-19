import { Image, View } from 'react-native';
import patterns from '../Const/patterns';
import { useLayoutEffect, useRef, useState } from 'react';
import { useContext } from '../Context';
import getPatternDimensions from '@/Shared/Utils/getPatternDimensions';

export default function PatternSection() {
  const { selectedPattern, imageInfo, patternContainerRef } = useContext();
  const { pattern, size: patternSize, id } = patterns[selectedPattern];

  const [size, setSize] = useState({ width: 0, height: 0 });

  const containerRef = useRef<View>(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      const aspectRatio = imageInfo.current.width / imageInfo.current.height;

      const size = getPatternDimensions({
        MAX_WIDTH: width,
        MAX_HEIGHT: height,
        aspectRatio,
        patternSize,
      });

      setSize(size);
    }
  }, [patternSize]);

  return (
    <View
      ref={containerRef}
      className="w-full flex-1 items-center justify-center overflow-hidden"
    >
      <View
        ref={patternContainerRef}
        className="items-center justify-center gap-0"
        collapsable={false}
      >
        {pattern.map((rows, index) => (
          <View
            key={index}
            className="flex-row items-center justify-center gap-0"
          >
            {rows.map((flip, index) => (
              <Image
                key={index}
                source={{ uri: imageInfo.current.path }}
                width={size.width}
                height={size.height}
                style={{
                  transform: [
                    { rotateX: `${flip.x ? 180 : 0}deg` },
                    { rotateY: `${flip.y ? 180 : 0}deg` },
                  ],
                }}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}
