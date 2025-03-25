import React, {useEffect} from 'react'
import { View, Text } from 'react-native'
import ScrollViewToTop from './scrollView'
import DeviceInfo from 'react-native-device-info'
import TianYan from '@webank/wt-console'

const ScrollViewCom = () => {

  useEffect(() => {
    const iphoneModel = DeviceInfo.getModel()
    console.log('iphoneModel', iphoneModel)
  }, [])
  return (
    <View>
      <TianYan />
      <ScrollViewToTop stickyHeaderIndices={[1]}>
        <View style={{ height: 50, backgroundColor: 'pink' }} />
        <View style={{ height: 500, backgroundColor: 'yellow' }}>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
        </View>
      </ScrollViewToTop>
    </View>
  )
}

export default ScrollViewCom
