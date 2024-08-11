import * as React from 'react';
import { Animated, StyleSheet, ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';
import { ThemedText } from "../components/ThemedText";

interface LogButtonProps {
    title?: string;
    icon?: string;
    onPress?: () => void;
    mode?: 'text' | 'elevated' | 'outlined' | 'contained' | 'contained-tonal';
    textColor?: string;
    buttonColor?: string;
}

const LogButton = ({
  title = "Press",
  icon = '',
  onPress,
  mode = 'elevated',
  textColor = "black",
  buttonColor,
}: LogButtonProps) => {
  const scale = React.useRef(new Animated.Value(1)).current; // Initial scale value

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95, // Scale down
      friction: 4,
      tension: 50,
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1, // Scale back to original size
      friction: 4,
      tension: 50,
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  };

  return (
    <Animated.View style={[styles.buttonContainer, { transform: [{ scale }] }]}>
      <Button
        icon={icon}
        mode={mode}
        onPress={onPress}
        onPressIn={handlePressIn} // Handle press in
        onPressOut={handlePressOut} // Handle press out
        textColor={textColor}
        buttonColor={buttonColor}
        style={[styles.button, mode === 'elevated' && styles.elevated]} // Apply styles based on mode
        contentStyle={styles.buttonContent} // Centers the content
        rippleColor="rgba(0, 0, 0, 0.1)" // Adds ripple effect on click
      >
        <ThemedText type="subtitle" style={styles.text}>
          {title}
        </ThemedText>
      </Button>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 8, // Adjust the border radius if needed
  },
  button: {
    borderRadius: 18, // Ensure button content has rounded corners
  },
  elevated: {
    elevation: 4, // Adds shadow and elevation effect for 'elevated' mode
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center', // Centers the content horizontally
    alignItems: 'center',     // Centers the content vertically
    paddingTop: 5, //
  },
  text: {
    textAlign: 'center', // Centers the text within ThemedText
    fontSize: 13, // Adjust font size if needed
  },
});

export default LogButton;
