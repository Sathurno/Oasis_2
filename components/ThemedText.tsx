import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {

  const [fontsLoaded] = useFonts({
    'Baloo-Regular': require('../assets/fonts/Inter-Regular.ttf'),
    'Baloo2-Regular': require('../assets/fonts/Sora-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // O un componente de carga si lo prefieres
  }

  return (
    <Text
      style={[
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Baloo-Regular',
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    fontFamily: 'Baloo-Regular',
  },
  title: {
    fontSize: 100,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Baloo2-Regular',
    textShadowColor: 'rgba(1, 1, 1, 0.4)',
    textShadowOffset: { width: -4, height: 14 },
    textShadowRadius: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Baloo2-Regular',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
    fontFamily: 'Baloo-Regular',
  },
});
