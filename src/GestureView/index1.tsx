import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
    useAnimatedGestureHandler,
  Easing,
  withTiming
} from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'

const screenWidth = Dimensions.get('window').width

export default function DraggableCircle() {
  const translateX = useSharedValue(screenWidth - 100)
  const translateY = useSharedValue(500)

  const onGestureEvent = useAnimatedGestureHandler({
      onStart: (_, ctx) => {
      ctx.offsetX = translateX.value
      ctx.offsetY = translateY.value
    },
    onActive: (event, ctx) => {
        let x = ctx.offsetX + event.translationX
        if (x >= screenWidth - 100) {
            x = screenWidth - 100
        } else if (x <= 0) {
            x = 0
        }
        let y = ctx.offsetY + event.translationY
        if (y >= 500) {
            y = 500
        } else if (y <= 0) {
            y = 0
        }
        translateX.value = x
        translateY.value = y
    },
    onEnd: event => {
      const targetX =
        event.translationX > (screenWidth - 100) / 2 ? screenWidth - 100 : 0
        translateX.value = withTiming(targetX, {
            duration: 200,
            easing: Easing.inOut(Easing.ease),
      })
    },
  })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    }
  })

  return (
      <View style={styles.container}>
          {/* <View style={{ height: 100, width: 100, backgroundColor: 'green' }}></View> */}
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[styles.circle, animatedStyle]} />
      </PanGestureHandler>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'yellow',
        position: 'absolute',
        width: '100%',
        height: 600,
        zIndex: 10
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'red',
  },
})
