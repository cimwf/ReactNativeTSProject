import React from 'react'
import { View, Text } from 'react-native'
import WebView from 'react-native-webview'
import OnceLoginHtml from './OnceLoginHtml'

function OnceLogin() {
  console.log('*********')
  const html = OnceLoginHtml()
  // console.log(html)
  console.log(OnceLoginHtml.toString())
  const a = function () {
    // 'hide source';
    // 'sensitive';
    ;('use strict')
    'show source';
  }
  console.log(a.toString())
  // console.log(a.hideSource())

  return (
    <View>
      <Text>123</Text>
      <View style={{ height: 300 }}>
        <WebView
          // source={{ html: OnceLoginHtml() }}
          source={{
            uri: 'https://www.amcfortune.com/article/20230531/CN_50030000_007937_FA010080_20230001_007937_20230531_090000_01.pdf',
          }}
          onMessage={a => {
            console.log(a.nativeEvent.data)
            console.log(typeof a.nativeEvent.data)
            if (typeof a.nativeEvent.data === 'object') {
              console.log(JSON.stringify(a.nativeEvent.data))
            }
          }}
        />
      </View>
      <Text>123--{a.toString()}</Text>
    </View>
  )
}

export default OnceLogin
