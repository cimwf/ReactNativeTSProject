import React from 'react'
import { View } from 'react-native'
import TouchableButton from './CommonButton'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../Types/router'

type PropsRoute = NativeStackScreenProps<RootStackParamList, 'Home', 'Stack'>
const Home = ({ navigation }: PropsRoute) => {
  return (
    <View style={{ flex: 1 }}>
      <TouchableButton
        title={'ScrollView'}
        color={'pink'}
        onPress={() => navigation.navigate('ScrollView', {})}
      />
      <TouchableButton
        title={'DraggableFlatlist'}
        color={'orange'}
        onPress={() => navigation.navigate('DraggableFlatlist', {})}
      />
      <TouchableButton
        title={'LanscapeView'}
        color={'cyan'}
        onPress={() => navigation.navigate('LanscapeView', {})}
      />
      <TouchableButton
        title={'OnceLogin'}
        color={'#ad5ff9'}
        onPress={() => navigation.navigate('OnceLogin', {})}
      />
      <TouchableButton
        title={'TextInputEx'}
        color={'#fefbdc'}
        onPress={() => navigation.navigate('TextInputEx', {})}
      />
      <TouchableButton
        title={'CalendarManager-ios'}
        color={'chartreuse'}
        onPress={() => navigation.navigate('CalendarManager', {})}
      />
      <TouchableButton
        title={'ToastModule-android'}
        color={'deeppink'}
        onPress={() => navigation.navigate('ToastModule', {})}
      />
      <TouchableButton
        title={'SwiperView'}
        color={'lightsalmon'}
        onPress={() => navigation.navigate('SwiperView', {})}
      />
      <TouchableButton
        title={'PDFComponent'}
        color={'darkseagreen'}
        onPress={() => navigation.navigate('PDFComponent', {})}
      />
      <TouchableButton
        title={'EchartsCom'}
        color={'pink'}
        onPress={() => navigation.navigate('EchartsCom', {})}
      />
      <TouchableButton
        title={'DatePickerCom'}
        color={'orange'}
        onPress={() => navigation.navigate('DatePickerCom', {})}
      />
      <TouchableButton
        title={'SnapCarousel'}
        color={'cyan'}
        onPress={() => navigation.navigate('SnapCarousel', {})}
      />
    </View>
  )
}

export default Home
