import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { Component } from 'react';
import { View, Button, NativeModules, NativeEventEmitter, Platform, Text } from 'react-native';
import { RootStackParamList } from '../Types/router';

const APP_ID_ANDROID = '118480887';
const API_KEY_ANDROID = 'ZYaQyjhSAFUdZhik2ZYGvsKz';
const SECRET_KEY_ANDROID = 'AvNddaqh6zT9JRTkrO6otdYqDITpVSHI';
const APP_ID_IOS = '118319132';
const API_KEY_IOS = 'CO1DRNHb0LMnMCD75HwwvJKu';
const SECRET_KEY_IOS = 'ZBlfeL2nfDYs1nzoF1sAHoxmzOX38q8a';

const ASRModuleEmitter = new NativeEventEmitter(NativeModules.ASRModule)
type PropsRoute = NativeStackScreenProps<RootStackParamList, 'BdAsr', 'Stack'>
type Props = PropsRoute
type State = {
  wakeUpTexts: string[]
  recognitionText: string
  recognitionTexts: string[]
}

const RecognitionStatus = {
  Underway: 'underway',
  Finish: 'finish'
}
class VoiceRecognition extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      wakeUpTexts: [],
      recognitionTexts: [],
      recognitionText: ''
    }
  }
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
      console.log(data)
      if (data.workStatus === RecognitionStatus.Underway) {
        this.setState({
          recognitionText: data.data
        })
      } else {
        this.setState({
          recognitionTexts: [...this.state.recognitionTexts, data.data],
          recognitionText: ''
        })
      }

    })
    ASRModuleEmitter.addListener('onWakeUpResult', data => {
      console.log('guanshan-----event')
      console.log(data)
      const wakeUpTexts = [...this.state.wakeUpTexts, JSON.stringify(data)]
      this.setState({
        wakeUpTexts: wakeUpTexts
      })
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
    NativeModules.BDSpeechModule.startSpeech('先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。')
  }

  batchSpeech = () => {
    NativeModules.BDSpeechModule.batchSpeech(['诚宜开张圣听', '以光先帝遗德', '恢弘志士之气', '不宜妄自菲薄', '引喻失义', '以塞忠谏之路也'])
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
        <Text>识别结果：</Text>
        {this.state.wakeUpTexts.map((item, index) => <Text key={item + index} >{item}</Text>)}
        <Text>{this.state.recognitionTexts.join('')}{this.state.recognitionText}</Text>
      </View>
    );
  }
}

export default VoiceRecognition;
