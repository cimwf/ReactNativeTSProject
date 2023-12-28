import React, { Component } from 'react'
import { View, Text, Animated } from 'react-native'
import { pannable } from 'react-native-gesture-recognizers'

class TransformOnPan extends Component {
  constructor(props: any) {
    super(props)
    this.state = {
      transform: new Animated.ValueXY(),
    }
  }

  onPan = ({ absoluteChangeX, absoluteChangeY }) => {
    this.state.transform.setValue({
      x: absoluteChangeX,
      y: absoluteChangeY,
    })
  }

  render() {
    const { transform } = this.state

    return (
      // we transform the decorator instead of the decorated view,
      // so there won't be any issues with ghost panning,
      // due to the wrapping view staying in place and receiving touches
      <PanMe
        onPan={this.onPan}
        panDecoratorStyle={{ transform: transform.getTranslateTransform() }}
      />
    )
  }
}

class PanMeView extends Component {
  render() {
    return (
      <View style={{ width: 100, height: 100, backgroundColor: 'red' }}>
        <Text>Pan me!</Text>
      </View>
    )
  }
}

export const PanMe = pannable({ setGestureState: false })(PanMeView)

const GestureView = () => {
    return (
        <View>
            <Text>123123</Text>
        </View>
    )
}

export default TransformOnPan