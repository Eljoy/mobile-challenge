import { ViewStyle } from 'react-native';
import normalize from 'react-native-normalize';

export const spaceScale = [
  0,
  normalize(4),
  normalize(8),
  normalize(16),
] as const;

const createScaledPropertyGetter =
  (property: keyof ViewStyle) => (x: keyof typeof spaceScale) => {
    return { [property]: spaceScale[x] };
  };

export const getMargin = createScaledPropertyGetter('margin');

export const getPadding = createScaledPropertyGetter('padding');

export const getHeight = createScaledPropertyGetter('height');

export const getWidth = createScaledPropertyGetter('width');

export const getPaddingHorizontal =
  createScaledPropertyGetter('paddingHorizontal');
