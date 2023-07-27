import React, { useEffect } from 'react'
import { View, Text, Button, NativeModules, NativeEventEmitter } from 'react-native'

const calendarManagerEmitter = new NativeEventEmitter(NativeModules.CalendarManagerModule)

const CalendarManager = () => {
  useEffect(() => {
    calendarManagerEmitter.addListener('EventReminder', name => {
      console.log('guanshan-----event')
      console.log(name)
    })
  }, [])

  return (
    <View>
      <Text>123</Text>
      <Button
        title="CalendarManager"
        onPress={() => {
          console.log(123)
          console.log(NativeModules.CalendarManagerModule)
          console.log(NativeModules.CalendarManagerModule.firstDayOfTheWeek)
          console.log(NativeModules.CalendarManagerModule.secondDayOfTheWeek)
          NativeModules.CalendarManagerModule.addEvent('Birthday Party', {
            location: '4 Privet Drive, Surrey',
            description: 'this a description',
            isShow: true,
            number: 5,
          })
          NativeModules.CalendarManagerModule.findEvents((str: string) => {
            console.log(str)
          })
        }}
      />
    </View>
  )
}

export default CalendarManager
