import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

type TouchableButtonProps = {
  title: string
  color: string
  onPress: () => void
}

const TouchableButton = ({ title, color, onPress }: TouchableButtonProps) => {
  return (
    <TouchableOpacity style={[styles.common, { backgroundColor: color }]} onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  common: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default TouchableButton
