import React from 'react'
import { View, Text } from 'react-native'
import ScrollViewToTop from './scrollView'

const ScrollViewCom = () => {
  return (
    <View>
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
