import React from 'react'
import { View, Button } from 'react-native'
import Orientation from 'react-native-orientation-locker'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../Types/router'

type PropsRoute = NativeStackScreenProps<RootStackParamList, 'LanscapeView', 'Stack'>
class LanscapeView extends React.Component<PropsRoute> {
  constructor(props: PropsRoute) {
    super(props)
  }

  componentDidMount() {
    Orientation.lockToLandscape()
  }

  componentWillUnmount() {
    Orientation.lockToPortrait()
  }

  render() {
    return (
      <View style={{ backgroundColor: 'red', flex: 1 }}>
        <Button
          title={'goback'}
          onPress={() => {
            this.props.navigation.pop()
          }}
        />
      </View>
    )
  }
}

export default LanscapeView
