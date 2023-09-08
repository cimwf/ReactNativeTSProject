import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './Home'
import ScrollViewCom from './ScrollView'
import DraggableFlatlist from './DraggableFlatlist'
import LanscapeView from './Landscape'
import OnceLogin from './OnceLogin'
import TextInputEx from './TextInputEx'
import CalendarManager from './CalendarManager'
import ToastModule from './ToastModule'
import SwiperView from './SwiperView'
import PDFComponent from './PDF'
import EchartsCom from './Echarts'
import DatePickerCom from './DatePicker'
import SnapCarousel from './SnapCarousel'
import { RootStackParamList } from './Types/router'

const Stack = createNativeStackNavigator<RootStackParamList>()

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen name={'Home'} component={Home} />
        <Stack.Screen name={'ScrollView'} component={ScrollViewCom} />
        <Stack.Screen name={'DraggableFlatlist'} component={DraggableFlatlist} />
        <Stack.Screen name={'LanscapeView'} component={LanscapeView} />
        <Stack.Screen name={'OnceLogin'} component={OnceLogin} />
        <Stack.Screen name={'TextInputEx'} component={TextInputEx} />
        <Stack.Screen name={'CalendarManager'} component={CalendarManager} />
        <Stack.Screen name={'ToastModule'} component={ToastModule} />
        <Stack.Screen name={'SwiperView'} component={SwiperView} />
        <Stack.Screen name={'PDFComponent'} component={PDFComponent} />
        <Stack.Screen name={'EchartsCom'} component={EchartsCom} />
        <Stack.Screen name={'DatePickerCom'} component={DatePickerCom} />
        <Stack.Screen name={'SnapCarousel'} component={SnapCarousel} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
