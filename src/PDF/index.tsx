import React from 'react'
import { View, Text } from 'react-native'
import Pdf from 'react-native-pdf'

function PDFComponent() {
  return (
    <View>
          <Pdf
              trustAllCerts={false}
        source={{
          uri: 'https://www.amcfortune.com/article/20230531/CN_50030000_007937_FA010080_20230001_007937_20230531_090000_01.pdf',
          cache: true,
        }}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`)
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`)
        }}
        onError={error => {
          console.log(error)
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`)
        }}
        style={{width: '100%', height: 500}}
      />
      <Text>123123</Text>
    </View>
  )
}

export default PDFComponent
