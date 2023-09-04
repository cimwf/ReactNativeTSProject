import React from 'react'
import { View, Text } from 'react-native'
import Echarts from 'native-echarts'

function EchartsCom() {
  const option = {
    calculable: true,
    legend: {
      right: 40,
      top: 'center',
      orient: 'vertical',
      data: ['货币型59.59%', '债券型40.41%'],
      icon: 'circle',
      itemGap: 6,
      itemWidth: 5,
      selectedMode: false,
      formatter: function (name: string) {
        'show source'
        return name
      },
      textStyle: {
        fontSize: 12,
        color: '#333',
      },
    },
    series: [
      {
        minAngle: 20,
        type: 'pie',
        hoverAnimation: false,
        radius: [37, 50],
        center: ['18%', '50%'],
        roseType: false,
        data: [
          { name: '货币型59.59%', value: '60' },
          { name: '债券型40.41%', value: '40' },
        ],
        silent: true,
        itemStyle: {
          normal: {
            borderColor: '#fff',
            borderWidth: 2,
          },
        },
        label: {
          normal: {
            show: false,
          },
        },
        labelLine: {
          normal: {
            show: false,
          },
        },
      },
    ],
    color: ['#5BA3F6', '#796EE0'],
  }
  return (
    <View>
      <Echarts option={option} />
      <Text>1234123</Text>
    </View>
  )
}

export default EchartsCom
