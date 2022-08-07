import { getHeight, getWidth, spaceScale } from '@design-system/lib';
import React from 'react';
import { View, ViewStyle } from 'react-native';

export declare namespace Spacer {
  export type Props = {
    heightScale?: keyof typeof spaceScale;
    widthScale?: keyof typeof spaceScale;
    flex?: number;
  };
}

export const Spacer: React.FC<Spacer.Props> = ({
  heightScale,
  widthScale,
  flex = 1,
}) => {
  const styles = [
    heightScale && getHeight(heightScale),
    widthScale && getWidth(widthScale),
    { flex },
  ];
  return <View style={styles as ViewStyle} />;
};
