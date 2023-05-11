import React, { useState } from 'react'
import { View, Text } from 'react-native'
import DraggableFlatListForNative from 'react-native-draggable-flatlist'

const DraggableFlatlist = () => {
  const [data, setData] = useState([
    {
      key: '1',
      value: '123',
    },
    {
      key: '2',
      value: '456',
    },
    {
      key: '3',
      value: '789',
    },
    {
      key: '4',
      value: '135',
    },
  ])

  return (
    <View style={{ backgroundColor: 'red', height: 500 }}>
      <Text>123</Text>
      <DraggableFlatListForNative
        data={data}
        keyExtractor={({ key }) => key}
        renderItem={({ item, drag }) => {
          return (
            <View style={{ backgroundColor: 'yellow', height: 50 }}>
              <Text>{item.value}</Text>
              <View onTouchMove={drag} style={{ backgroundColor: 'pink', height: 30, width: 30 }} />
            </View>
          )
        }}
        onDragEnd={newData => setData(newData.data)}
      />
    </View>
  )
}

export default DraggableFlatlist
