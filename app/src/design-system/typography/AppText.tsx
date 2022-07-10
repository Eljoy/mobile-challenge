import React, { ReactNode } from 'react'
import { StyleProp, Text, TextProps, TextStyle } from 'react-native'
import {
  getFontSizeStyle,
  getFontWeightStyle,
  TokenTypography,
} from '../design-tokens/TokenTypography'

export type AppTextProps = {
  fontSize: TokenTypography.FontSize
  fontWeight: TokenTypography.FontWeight
  children?: ReactNode
} & TextProps

export const AppText: React.FC<AppTextProps> = ({
  style,
  fontSize,
  fontWeight,
  ...props
}) => {
  const appTextStyle: StyleProp<TextStyle>[] = [
    getFontSizeStyle(fontSize),
    getFontWeightStyle(fontWeight),
    style,
  ]
  return <Text {...props} style={appTextStyle} />
}
