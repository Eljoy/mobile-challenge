import React from 'react'
import { StyleProp, TextProps, TextStyle } from 'react-native'
import { TokenTypography } from '../design-tokens/TokenTypography'
import { AppText, AppTextProps } from './AppText'

export const TitleText: React.FC<
  Pick<AppTextProps, 'children'> & TextProps
> = ({ children, style, ...props }) => {
  const styles: StyleProp<TextStyle> = [style, { textTransform: 'uppercase' }]
  return (
    <AppText
      {...props}
      fontSize={TokenTypography.FontSize.Title}
      fontWeight={TokenTypography.FontWeight.Title}
      style={styles}
    >
      {children}
    </AppText>
  )
}
