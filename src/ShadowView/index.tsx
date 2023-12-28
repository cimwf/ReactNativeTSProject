import React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import { BoxShadow } from 'react-native-shadow'

const ShadowView = () => {
     const shadowOpt = {
       width: 160,
       height: 170,
       color: '#000',
       border: 2,
       radius: 3,
       opacity: 0.1,
       x: 2,
       y: 2,
       style: { marginVertical: 5 },
     }
    return (
      <BoxShadow setting={shadowOpt}>
        <TouchableHighlight
          style={{
            position: 'relative',
            width: 160,
            height: 170,
            backgroundColor: '#fff',
            borderRadius: 3,
            // marginVertical:5,
            overflow: 'hidden',
          }}
        >
          <Text>…………………………</Text>
        </TouchableHighlight>
      </BoxShadow>
    )

}

export default ShadowView