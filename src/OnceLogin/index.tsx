import React from 'react'
import { View, Text } from 'react-native'
import WebView from 'react-native-webview'
import OnceLoginHtml from './OnceLoginHtml'

function OnceLogin() {
  console.log('*********')
  const html = OnceLoginHtml()
  console.log(html)

  return (
    <View>
      <Text>123</Text>
      <View style={{ height: 300 }}>
        <WebView
          source={{ html: OnceLoginHtml() }}
          onMessage={a => {
            console.log(a.nativeEvent.data)
            console.log(typeof a.nativeEvent.data)
            if (typeof a.nativeEvent.data === 'object') {
              console.log(JSON.stringify(a.nativeEvent.data))
            }
          }}
        />
      </View>
      <Text>123</Text>
    </View>
  )
}

export default OnceLogin
