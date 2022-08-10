import { FontColor } from '@design-system/typography';
import React from 'react';
import normalize from 'react-native-normalize';
import RNIcon from 'react-native-vector-icons/Feather';
import { IconProps } from 'react-native-vector-icons/Icon';

export const Icon: React.FC<IconProps> = ({
  size = normalize(24),
  color = FontColor.Secondary,
  ...props
}) => {
  return <RNIcon size={size} color={color} {...props} />;
};
