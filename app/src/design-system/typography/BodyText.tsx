import { TokenTypography } from '@design-system/design-tokens/TokenTypography'
import React from 'react'
import { TextProps } from 'react-native'
import { AppText, AppTextProps } from './AppText'

export const BodyText: React.FC<Pick<AppTextProps, 'children'> & TextProps> = ({
  children,
  ...props
}) => {
  return (
    <AppText
      fontWeight={TokenTypography.FontWeight.Body}
      {...props}
      fontSize={TokenTypography.FontSize.Body}
    >
      {children}
    </AppText>
  )
}
