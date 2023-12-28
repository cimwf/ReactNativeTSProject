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
// import PDFComponent from './PDF'
import EchartsCom from './Echarts'
import DatePickerCom from './DatePicker'
import SnapCarousel from './SnapCarousel'
import { RootStackParamList, IMStackParamList } from './Types/router'
import ShadowView from './ShadowView'
import GestureView from './GestureView/index1'
import Trtc from './trtc'
import IMView from './IM'
import HomeScreen from './IM/pages/Home'
import UserScreen from './IM/pages/User'
import DetailsScreen from './IM/pages/Details'

const Stack = createNativeStackNavigator<RootStackParamList>()
const IMStack = createNativeStackNavigator<IMStackParamList>()

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
        {/* <Stack.Screen name={'PDFComponent'} component={PDFComponent} /> */}
        <Stack.Screen name={'EchartsCom'} component={EchartsCom} />
        <Stack.Screen name={'DatePickerCom'} component={DatePickerCom} />
        <Stack.Screen name={'SnapCarousel'} component={SnapCarousel} />
        <Stack.Screen name={'ShadowView'} component={ShadowView} />
        <Stack.Screen name={'GestureView'} component={GestureView} />
        <Stack.Screen name={'Trtc'} component={Trtc} />
        {/* <Stack.Screen name={'IMViewContainer'} component={IMViewContainer} /> */}
        <Stack.Screen name={'IMView'} component={IMView} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export function IMViewContainer() {
  return (
    <IMStack.Navigator initialRouteName={'IMHomeScreen'}>
      {/* <IMStack.Screen name={'IMView'} component={IMView} /> */}
      <IMStack.Screen name={'IMHomeScreen'} component={HomeScreen} />
      <IMStack.Screen name={'IMUserScreen'} component={UserScreen} />
      <IMStack.Screen name={'IMDetailsScreen'} component={DetailsScreen} />
    </IMStack.Navigator>
  )
}

export default App
