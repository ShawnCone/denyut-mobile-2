import React from 'react'
import { Pressable, StyleProp, View, ViewStyle } from 'react-native'
import Typography from '../Typography'
import { tokens } from '../tokens/tokens'

type SelectMenuOption = {
  value: string
  label: string
}

export type RadioSelectOptions = [SelectMenuOption, ...SelectMenuOption[]]

export type RadioSelectProps = {
  options: RadioSelectOptions
  direction?: 'row' | 'column'
  value: string
  onChange: (value: string) => void
}

function RadioSelect({
  options,
  direction = 'row',
  value,
  onChange,
}: RadioSelectProps) {
  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue)
  }

  const containerStyle: StyleProp<ViewStyle> =
    direction === 'row'
      ? { flexDirection: 'row', alignItems: 'center', gap: tokens.margin.L }
      : {
          flexDirection: 'column',
          gap: tokens.margin.L,
        }

  return (
    <View style={containerStyle}>
      {options.map((option, index) => (
        <Pressable
          key={index}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.margin.S,
          }}
          onPress={() => handleSelect(option.value)}
        >
          {/* Make circle icon */}
          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: 24,
              borderWidth: tokens.borderWidth.L,
              borderColor: tokens.colors.primary.normal,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {value === option.value && (
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: tokens.borderRadius.M,
                  backgroundColor: tokens.colors.primary.normal,
                }}
              />
            )}
          </View>
          <Typography
            variant={{
              size: 'caption',
            }}
          >
            {option.label}
          </Typography>
        </Pressable>
      ))}
    </View>
  )
}

export default RadioSelect
