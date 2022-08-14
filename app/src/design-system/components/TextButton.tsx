import { Font, Text } from '@design-system/typography';
import React from 'react';
import {
  Platform,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

export declare namespace TextButton {
  export type Props = {
    color?: string;
  } & TouchableOpacityProps;
}

export const TextButton: React.FC<TextButton.Props> = ({
  children,
  color = Platform.select({ android: '#2196F3', ios: '#007AFF' }),
  ...props
}) => {
  return (
    <TouchableOpacity {...props}>
      <Text font={Font.Button} style={{ color }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};
