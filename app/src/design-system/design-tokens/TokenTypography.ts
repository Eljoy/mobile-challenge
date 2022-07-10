import { createPropertyGetter } from './createPropertyGetter'

enum FontSizeOptions {
  S = 14,
  M = 16,
  L = 24,
}

enum FontWeightOptions {
  Normal = 'normal',
  Heavy = 'bold',
}

export namespace TokenTypography {
  export enum FontSize {
    Body = FontSizeOptions.S,
    Title = FontSizeOptions.L,
  }

  export enum FontWeight {
    Body = FontWeightOptions.Normal,
    Title = FontWeightOptions.Heavy,
  }
}

export const getFontSizeStyle =
  createPropertyGetter<TokenTypography.FontSize>('fontSize')

export const getFontWeightStyle =
  createPropertyGetter<TokenTypography.FontWeight>('fontWeight')
