type getPatternDimensionsArgs = {
  MAX_WIDTH: number;
  MAX_HEIGHT: number;
  aspectRatio: number;
  patternSize: [1 | 2, 1 | 2];
};

export default function getPatternDimensions({
  MAX_WIDTH,
  MAX_HEIGHT,
  aspectRatio,
  patternSize: [rows, cols],
}: getPatternDimensionsArgs) {
  const tileMaxWidth = MAX_WIDTH / cols;
  const tileMaxHeight = MAX_HEIGHT / rows;

  let width = tileMaxWidth;
  let height = width / aspectRatio;

  if (height > tileMaxHeight) {
    height = tileMaxHeight;
    width = height * aspectRatio;
  }

  return { width, height };
}
