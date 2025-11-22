import * as React from 'react';
import { Image, Animated, StyleSheet, View, ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';
import { ThemedText } from "../components/ThemedText";


interface LogButtonProps {
    title?: string;
    icon?: any; // Cambia a any para manejar imágenes importadas
    onPress?: () => void;
    mode?: 'text' | 'elevated' | 'outlined' | 'contained' | 'contained-tonal';
    textColor?: string;
    buttonColor?: string;
    style?: ViewStyle; // Agregar la posibilidad de pasar estilos personalizados
    sizeText?: number; // Agregar la posibilidad de pasar el tamaño de texto personalizado
}

const LogButton = ({
  title = "",
  icon,
  onPress,
  sizeText = 14, // Valor predeterminado de tamaño de texto
  mode = 'elevated',
  textColor = "black",
  buttonColor,
  style = {}, // Añadir un valor predeterminado para style
}: LogButtonProps) => {
  const scale = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      friction: 4,
      tension: 50,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 4,
      tension: 50,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[styles.buttonContainer, { transform: [{ scale }] }, style]}>
      <Button
        mode={mode}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        textColor={textColor}
        buttonColor={buttonColor}
        style={[styles.button, mode === 'elevated' && styles.elevated]}
        contentStyle={styles.buttonContent}
        rippleColor="rgba(0, 0, 0, 0.1)"
      >
        {icon && (
          <View style={styles.iconContainer}>
            <Image source={icon} style={styles.icon} resizeMode="contain" />
          </View>
        )}
        {title && (
          <View style={styles.textContainer}>
            <ThemedText type="subtitle" style={[styles.text, { fontSize: sizeText, color: textColor }]}>
              {title}
            </ThemedText>
          </View>
        )}
      </Button>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 8,
    height: 50,
  },
  button: {
    borderRadius: 6,
    alignItems: 'center', // Alinea verticalmente el ícono y el texto
    padding: 8, // Asegura que el botón tenga algo de relleno
  },
  elevated: {
    elevation: 4,
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  iconContainer: {
    justifyContent: 'center', // Centra el ícono verticalmente
    alignItems: 'center', // Centra el ícono horizontalmente
    marginRight: 8, // Espacio entre el ícono y el texto
    
  },
  icon: {
    width: 24, // Ajusta el tamaño del ícono
    height: 24,
  },
  textContainer: {
  },
  text: {
    textAlign: 'center',
  },
});

export default LogButton;
