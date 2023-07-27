import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../Types/router'

type PropsRoute = NativeStackScreenProps<RootStackParamList, 'Home', 'Stack'>
const Home = ({ navigation }: PropsRoute) => {
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={{
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'pink',
        }}
        onPress={() => {
          navigation.navigate('ScrollView', {})
        }}
      >
        <Text>scrollView</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'orange',
        }}
        onPress={() => {
          navigation.navigate('DraggableFlatlist', {})
        }}
      >
        <Text>DraggableFlatlist</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'cyan',
        }}
        onPress={() => {
          navigation.navigate('LanscapeView', {})
        }}
      >
        <Text>LanscapeView</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ad5ff9',
        }}
        onPress={() => {
          navigation.navigate('OnceLogin', {})
        }}
      >
        <Text>OnceLogin</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fefbdc',
        }}
        onPress={() => {
          navigation.navigate('TextInputEx', {})
        }}
      >
        <Text>TextInputEx</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home
