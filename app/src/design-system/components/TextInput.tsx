import { spaceScale } from '@design-system/lib';
import { Font, FontColor, getFontStyle } from '@design-system/typography';
import React, { PropsWithoutRef, RefAttributes } from 'react';
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps,
} from 'react-native';

export declare namespace TextInput {
  export type Props = {} & TextInputProps;
}
export const TextInput: React.ForwardRefExoticComponent<
  PropsWithoutRef<TextInput.Props> & RefAttributes<RNTextInput>
> = React.forwardRef((props, ref) => (
  <RNTextInput
    ref={ref}
    style={[styles.textInput, getFontStyle(Font.Body1, FontColor.Primary)]}
    selectionColor={FontColor.Primary}
    placeholderTextColor={FontColor.Secondary}
    {...props}
  />
));

const styles = StyleSheet.create({
  textInput: {
    padding: spaceScale[1],
    paddingHorizontal: spaceScale[2],
  },
});
