import React, { Component } from 'react';
import { View, Button, NativeModules, NativeEventEmitter } from 'react-native';

export const BAIDU_APP_ID = '117715051';
export const BAIDU_API_KEY = 'IRw5cHs5X90x7DLMF6eZ65BZ';
export const BAIDU_SECRET_KEY = 'TNOeiWq0gn20b74kAwlJTlL0PJgFpDyk';
const ASRModuleEmitter = new NativeEventEmitter(NativeModules.ASRModule)

class VoiceRecognition extends Component {
  componentDidMount() {
    ASRModuleEmitter.addListener('VoiceRecognitionClientWorkStatusChanged', data => {
      console.log('guanshan-----VoiceRecognitionClientWorkStatusChanged')
      console.log(data)
    })
    ASRModuleEmitter.addListener('WakeupClientWorkStatusChanged', data => {
      console.log('guanshan-----event')
      console.log(data)
    })
  }

  startRecognition = () => {
    NativeModules.ASRModule.startRecognition()
  };

  stopRecognition = () => {
    NativeModules.ASRModule.startRecognition()
  };

  startWakeUp = () => {
    NativeModules.ASRModule.startWakeUp()
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
        <Button title="开始识别" onPress={this.startRecognition} />
        <Button title="停止识别" onPress={this.stopRecognition} />
        <Button title="开始合成" onPress={this.startSpeech} />
        <Button title="停止合成" onPress={this.stopSpeech} />
      </View>
    );
  }
}

export default VoiceRecognition;
