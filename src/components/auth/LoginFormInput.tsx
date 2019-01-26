import * as React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
} from 'react-native-elements'

interface LoginFormInputProps {
  label: string
  value: string
  secureTextEntry?: boolean
  showValidationError?: boolean
  validationErrorMessage?: string
  onChangeText: any
  //   onChangeText: (text: string) => void
}

export default class LoginFormInput extends React.Component<
  LoginFormInputProps,
  {}
> {
  render() {
    const {
      label,
      value,
      secureTextEntry,
      validationErrorMessage,
      showValidationError,
      onChangeText,
    } = this.props

    return (
      <View>
        <FormLabel>{label}</FormLabel>
        <FormInput
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={() => onChangeText(value)}
        />
        {showValidationError && (
          <FormValidationMessage>
            {validationErrorMessage}
          </FormValidationMessage>
        )}
      </View>
    )
  }
}
