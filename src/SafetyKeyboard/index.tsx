import React, { Component } from 'react'
import { View, Text, Button, Dimensions, TouchableOpacity } from 'react-native'
import { SecurityKeyboardInput } from 'react-native-supervons-custom-keyboard'

// const SafetyKeyboard = () => {
//   return (
//     <View>
//       <Text>12312</Text>
//     </View>
//   )
// }
class SafetyKeyboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
    }
  }

    render() {
      const width = Dimensions.get('window').width
    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <View style={{ height: 150 }}>
          <SecurityKeyboardInput
            keyName={'password'}
            style={{ width: width * 0.96, borderBottomColor: '#939DA6', borderBottomWidth: 1 }}
            secureTextEntry={true}
            random={true}
            valueStyle={{ fontSize: 18, left: 1 }}
            secureTextStyle={{ fontSize: 10 }}
            keyboardType={'string'}
            placeholder={'密码'}
            placeholderTextColor={'#CACACB'}
            onChangeText={text => this.setState({ inputValue: text })}
          />
          <Button title={'outPut'} onPress={() => alert(this.state.inputValue)} />
          <TouchableOpacity
            activeOpacity={1}
            style={{
              width: '100%',
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
            }}
          >
            <Text>123123</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default SafetyKeyboard
