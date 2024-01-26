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
      {/* <TouchableButton
        title={'PDFComponent'}
        color={'darkseagreen'}
        onPress={() => navigation.navigate('PDFComponent', {})}
      /> */}
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
      <TouchableButton
        title={'ShadowView'}
        color={'#ad5ff9'}
        onPress={() => navigation.navigate('ShadowView', {})}
      />
      <TouchableButton
        title={'GestureView'}
        color={'#fefbdc'}
        onPress={() => navigation.navigate('GestureView', {})}
      />
      <TouchableButton
        title={'Trtc'}
        color={'chartreuse'}
        onPress={() => navigation.navigate('Trtc', {})}
      />
      <TouchableButton
        title={'IMView'}
        color={'deeppink'}
        onPress={() => navigation.navigate('IMView', {})}
      />
      <TouchableButton
        title={'SafetyKeyboard'}
        color={'lightsalmon'}
        onPress={() => navigation.navigate('SafetyKeyboard', {})}
      />
    </View>
  )
}

export default Home
