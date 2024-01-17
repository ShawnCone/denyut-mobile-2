// Design system tokens

import { colors } from './colors'
import { fontFamilies } from './font-families'
import { fontSizing } from './font-sizing'

export const tokens = {
  // Margin tokens
  margin: {
    none: 0,
    XS: 2,
    S: 4,
    M: 8,
    L: 16,
    XL: 32,
    XXL: 64,
  },
  // Padding tokens
  padding: {
    none: 0,
    S: 4,
    M: 8,
    L: 16,
    XL: 32,
    XXL: 64,
  },
  // Border radius tokens
  borderRadius: {
    none: 0,
    XS: 2,
    S: 4,
    M: 8,
    full: 9999,
  },
  // Border width tokens
  borderWidth: {
    S: 1,
    M: 1.5,
    L: 2,
  },

  // Icon size tokens
  iconSize: {
    S: 16,
    M: 24,
    L: 32,
    XL: 48,
  },
  // Width tokens
  width: {
    S: 320,
    M: 480,
    L: 640,
  },

  // Colors
  colors,

  // Opacity tokens
  opacity: {
    NONE: 0,
    LOW: 0.3,
    MEDIUM: 0.5,
    HIGH: 0.8,
  },

  fontSizing,
  fontFamilies,
}
