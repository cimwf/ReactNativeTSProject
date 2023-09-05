import React, { useState } from 'react'
import { View, Text, Button } from 'react-native'
import DatePicker from 'react-native-date-picker'

function DatePickerCom() {
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button title="Open" onPress={() => setOpen(true)} />
      <DatePicker
        modal
        open={open}
        date={date}
        mode={'date'}
        locale={'Chinese'}
        confirmText={'确认'}
        cancelText={'取消'}
        title={' '}
        onConfirm={date => {
          const y = date.getFullYear()
          const m = (date.getMonth() + 1).toString().padStart(2, '0')
          const d = date.getDate().toString().padStart(2, '0')
          console.log(y + '-' + m + '-' + d)
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </>
  )
}

export default DatePickerCom
