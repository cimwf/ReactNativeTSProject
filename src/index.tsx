import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './Home'
import ScrollViewCom from './ScrollView'
import DraggableFlatlist from './DraggableFlatlist'
import LanscapeView from './Landscape'
import OnceLogin from './OnceLogin'
import TextInputEx from './TextInputEx'
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
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
