import React, { useRef, useState } from 'react'
import { View, Text, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native'

function TextInputEx() {
  const inputRef = useRef<TextInput>(null)
  const [textValue, setTextValue] = useState('')

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={'padding'} keyboardVerticalOffset={100}>
      <Text>123</Text>
      <ScrollView>
        <View style={{ height: 600, backgroundColor: 'red' }}>
          <Text>3456789</Text>
          <Text>3456789</Text>
          <Text>3456789</Text>
          <Text>3456789</Text>
          <Text>3456789</Text>
          <Text>3456789</Text>
          <Text>3456789</Text>
          <Text>3456789</Text>
          <Text>3456789</Text>
        </View>
        <TextInput
          ref={inputRef}
          value={textValue}
          style={{ height: 40, borderWidth: 1, borderColor: 'blue' }}
          onChangeText={text => {
            console.log(text)
            if (text && !textValue) {
              console.log(inputRef)
              setTextValue(text + '.00')
              setTimeout(() => {
                inputRef.current &&
                  inputRef.current.setNativeProps({ selection: { start: 1, end: 1 } })
              }, 100)
            } else {
              setTextValue(text)
            }
          }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default TextInputEx
