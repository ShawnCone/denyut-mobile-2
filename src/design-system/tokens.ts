// Design system tokens

import { colors } from './colors'
import { fontSizing } from './font-sizing'
import { fontWeight } from './font-weight'

export const tokens = {
  // Margin tokens
  margin: {
    none: 0,
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
    S: 4,
    M: 8,
  },
  // Icon size tokens
  iconSize: {
    S: 16,
    M: 24,
    L: 32,
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

  fontWeight,
  fontSizing,
}
