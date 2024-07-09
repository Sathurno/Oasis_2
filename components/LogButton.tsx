import * as React from 'react';
import { Button } from 'react-native-paper';
import colors from '../constants/Colors'
interface LogButtomProps{
    title?: string,
    icon?: string,
    onPress?: () => void,
    mode?: string,
    textColor?: string,
    buttonColor?: string,
}
const LogButton = ({title = "press", icon ='', onPress, mode = "elevated", textColor = "black", buttonColor}:LogButtomProps) => (
  <Button icon= {icon} mode= {mode} onPress={onPress} textColor = {textColor} buttonColor ={buttonColor}>
    {title}
  </Button>
);

export default LogButton;