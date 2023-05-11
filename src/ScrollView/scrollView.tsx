import React from 'react'
import { View, ScrollView } from 'react-native'

const ScrollViewToTop = function (props: any) {
  const renderHeader = () => {
    return (
      <>
        <View style={{ height: 50, backgroundColor: 'blue' }} />
        <View style={{ height: 50, backgroundColor: 'orange' }} />
      </>
    )
  }
  return (
    <ScrollView style={{ width: '100%', height: 300, backgroundColor: 'red' }} {...props}>
      {renderHeader()}
      {props.children}
    </ScrollView>
  )
}

export default ScrollViewToTop
