import React, { useState } from 'react'
import { View, Text } from 'react-native'
import Carousel from 'react-native-snap-carousel'

function SnapCarousel() {
  const data = [
    { name: 'zhangsan', age: 20, color: 'red' },
    { name: 'lisi', age: 22, color: 'yellow' },
    { name: 'wangwu', age: 24, color: 'green' },
  ]

  function renderItem({item, index}: { item: { name: string, age: number, color: string }, index: number }) {
     return (
       <View style={{ height: 300, backgroundColor: item.color }}>
         <Text>{item.name}</Text>
       </View>
     )
  }

  return (
    <View>
      <Text>1234</Text>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={400}
        itemWidth={300}
        itemHeight={500}
        layout={'stack'}
        layoutCardOffset={15}
        pagingEnabled={true}
      />
    </View>
  )
}

export default SnapCarousel
