import React, { useRef, useEffect } from 'react'
import { Text, TouchableOpacity, NativeModules, NativeEventEmitter } from 'react-native'

const ToastModule = () => {
  const ToastExample = useRef(NativeModules.ToastExample).current

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample)
    const eventEmitterListener = eventEmitter.addListener('EventReminder', data => {
      console.log('guanshan-------eventEmitter')
      console.log(data)
    })

    return () => {
      eventEmitterListener.remove()
    }
  }, [])

  return (
    <TouchableOpacity
      style={{
        height: 50,
        width: '100%',
        backgroundColor: 'cyan',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={() => {
        console.log('guanshan------ToastModule')
        ToastExample.show('Awesome', ToastExample.SHORT)
        setTimeout(() => {
          ToastExample.sendObject({ a: 1, b: '2', c: true })
        }, 1000)
      }}
    >
      <Text>show toast</Text>
    </TouchableOpacity>
  )
}

export default ToastModule
