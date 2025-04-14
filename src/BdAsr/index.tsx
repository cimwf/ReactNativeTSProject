import React, { Component } from 'react';
import { View, Button, NativeModules, NativeEventEmitter } from 'react-native';

export const BAIDU_APP_ID = '118480887';
export const BAIDU_API_KEY = 'ZYaQyjhSAFUdZhik2ZYGvsKz';
export const BAIDU_SECRET_KEY = 'AvNddaqh6zT9JRTkrO6otdYqDITpVSHI';
const ASRModuleEmitter = new NativeEventEmitter(NativeModules.ASRModule)

class VoiceRecognition extends Component {
  componentDidMount() {
    console.log(123123)
    NativeModules.ASRModule.init({
      APP_ID: BAIDU_APP_ID,
      APP_KEY: BAIDU_API_KEY,
      SECRET: BAIDU_SECRET_KEY
    })
    console.log(NativeModules.ASRModule)
    ASRModuleEmitter.addListener('onRecognizerResult', data => {
      console.log('guanshan-----onRecognizerResult')
      console.log(JSON.stringify(data))
      console.log(data.code)
      console.log(data.data)
    })
    ASRModuleEmitter.addListener('onWakeUpResult', data => {
      console.log('guanshan-----event')
      console.log(data)
    })
  }

  startRecognition = () => {
    NativeModules.ASRModule.startRecognition()
  };

  stopRecognition = () => {
    NativeModules.ASRModule.stopRecognition()
  };

  startWakeUp = () => {
    NativeModules.ASRModule.startWakeUp()
  }

  stopWakeUp = () => {
    NativeModules.ASRModule.stopWakeUp()
  }

  startSpeech = () => {
    NativeModules.BDSpeechModule.startSpeech()
  }

  stopSpeech = () => {
    NativeModules.BDSpeechModule.stopSpeech()
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="开始唤醒" onPress={this.startWakeUp} />
        <Button title="停止唤醒" onPress={this.stopWakeUp} />
        <Button title="开始识别" onPress={this.startRecognition} />
        <Button title="停止识别" onPress={this.stopRecognition} />
        <Button title="开始合成" onPress={this.startSpeech} />
        <Button title="停止合成" onPress={this.stopSpeech} />
      </View>
    );
  }
}

export default VoiceRecognition;
