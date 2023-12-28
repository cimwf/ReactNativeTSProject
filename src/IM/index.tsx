import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { CallBackContext } from './useContext'
import HomeScreen from './pages/Home'
import { IMViewContainer } from '..'

const IMView = () => {
    const setCallbackDataHandle = dataObj => {
      const temp = callbackData.contextData
      temp.push(dataObj)
      setCallbackData({
        contextData: temp,
        setCallbackData: setCallbackDataHandle,
        clearCallbackData: clearCallbackHandle,
      })
    }

    const clearCallbackHandle = () => {
      setCallbackData({
        contextData: [],
        setCallbackData: setCallbackDataHandle,
        clearCallbackData: clearCallbackHandle,
      })
    }
    const [callbackData, setCallbackData] = useState<any>({
      contextData: [],
      setCallbackData: setCallbackDataHandle,
      clearCallbackData: clearCallbackHandle,
    })
  return (
    <View style={{ backgroundColor: 'yellow', flex: 1 }}>
      <Text>IMView</Text>
      <CallBackContext.Provider value={callbackData}>
      <IMViewContainer />

      </CallBackContext.Provider>
    </View>
  )
}

export default IMView
