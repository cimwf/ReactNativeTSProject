import React, { Component } from 'react';
import { View, Button, NativeModules, NativeEventEmitter, Platform } from 'react-native';

const APP_ID_ANDROID = '118480887';
const API_KEY_ANDROID = 'ZYaQyjhSAFUdZhik2ZYGvsKz';
const SECRET_KEY_ANDROID = 'AvNddaqh6zT9JRTkrO6otdYqDITpVSHI';
const APP_ID_IOS = '118319132';
const API_KEY_IOS = 'CO1DRNHb0LMnMCD75HwwvJKu';
const SECRET_KEY_IOS = 'ZBlfeL2nfDYs1nzoF1sAHoxmzOX38q8a';

const ASRModuleEmitter = new NativeEventEmitter(NativeModules.ASRModule)

class VoiceRecognition extends Component {
  componentDidMount() {
    let APP_ID = '', API_KEY = '', SECRET_KEY = ''
    if (Platform.OS === 'android') {
      APP_ID = APP_ID_ANDROID
      API_KEY = API_KEY_ANDROID
      SECRET_KEY = SECRET_KEY_ANDROID
    } else {
      APP_ID = APP_ID_IOS
      API_KEY = API_KEY_IOS
      SECRET_KEY = SECRET_KEY_IOS
    }
    
    NativeModules.ASRModule.initModule({
      APP_ID: APP_ID,
      API_KEY: API_KEY,
      SECRET_KEY: SECRET_KEY
    })
    NativeModules.BDSpeechModule.initModule({
      APP_ID: APP_ID,
      API_KEY: API_KEY,
      SECRET_KEY: SECRET_KEY
    })
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

  startLongSpeech = () => {
    NativeModules.ASRModule.startLongSpeech()
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
    NativeModules.BDSpeechModule.startSpeech('大家好, 哈哈哈哈哈哈哈哈哈哈哈，大家好， 哈哈哈哈哈哈哈哈哈哈哈')
  }

  batchSpeech = () => {
    NativeModules.BDSpeechModule.batchSpeech(['123', '大家好', 'abc'])
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
        <Button title="长语音识别" onPress={this.startLongSpeech} />
        <Button title="停止识别" onPress={this.stopRecognition} />
        <Button title="批量合成" onPress={this.batchSpeech} />
        <Button title="开始合成" onPress={this.startSpeech} />
        <Button title="停止合成" onPress={this.stopSpeech} />
      </View>
    );
  }
}

export default VoiceRecognition;
