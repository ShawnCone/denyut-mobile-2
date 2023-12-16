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
  disabled?: boolean
}

const RADIO_SIZE = {
  outer: tokens.iconSize.M,
  inner: tokens.iconSize.M / 2,
}

const RADIO_COLOR = {
  disabled: tokens.colors.primary.light,
  active: tokens.colors.primary.normal,
}

function RadioSelect({
  options,
  direction = 'row',
  value,
  onChange,
  disabled = false,
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
          disabled={disabled}
        >
          {/* Make circle icon */}
          <View
            style={{
              width: RADIO_SIZE.outer,
              height: RADIO_SIZE.outer,
              borderRadius: RADIO_SIZE.outer,
              borderWidth: tokens.borderWidth.L,
              borderColor: disabled ? RADIO_COLOR.disabled : RADIO_COLOR.active,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {value === option.value && (
              <View
                style={{
                  width: RADIO_SIZE.inner,
                  height: RADIO_SIZE.inner,
                  borderRadius: RADIO_SIZE.inner,
                  backgroundColor: disabled
                    ? RADIO_COLOR.disabled
                    : RADIO_COLOR.active,
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
