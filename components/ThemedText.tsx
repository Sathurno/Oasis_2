import React from 'react';
import { Text, TextProps, StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import {
  BalooTamma2_400Regular,
  BalooTamma2_500Medium,
  BalooTamma2_600SemiBold,
  BalooTamma2_700Bold,
  BalooTamma2_800ExtraBold,
} from '@expo-google-fonts/baloo-tamma-2';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  children: React.ReactNode; // Ensure children can be of type string or ReactNode
};

const fontFamilies = {
  default: 'BalooTamma2_400Regular',
  defaultSemiBold: 'BalooTamma2_500Medium',
  title: 'BalooTamma2_800ExtraBold',
  subtitle: 'BalooTamma2_800ExtraBold',
  link: 'BalooTamma2_400Regular',
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  children,
  ...rest
}: ThemedTextProps) {
  const [fontsLoaded] = useFonts({
    BalooTamma2_400Regular,
    BalooTamma2_500Medium,
    BalooTamma2_600SemiBold,
    BalooTamma2_700Bold,
    BalooTamma2_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null; // Or a loading component if you prefer
  }

  // Check if children is a string
  const isString = typeof children === 'string';
  const firstLetter = isString ? children.charAt(0) : '';
  const restOfText = isString ? children.slice(1) : children;

  return (
    <Text
      style={[
        styles.base,
        type === 'default' && { fontFamily: fontFamilies.default, fontSize: 16, lineHeight: 24 },
        type === 'defaultSemiBold' && { fontFamily: fontFamilies.defaultSemiBold, fontSize: 16, lineHeight: 24, fontWeight: '600' },
        type === 'title' && {
          fontFamily: fontFamilies.title,
          color: 'white',
          textShadowColor: 'rgba(1, 1, 1, 0.55)',
          textShadowOffset: { width: 0, height: 13 },
          textShadowRadius: 20,
          opacity: 0.86,
        },
        type === 'subtitle' && { fontFamily: fontFamilies.subtitle },
        type === 'link' && { fontFamily: fontFamilies.link, fontSize: 16, color: '#0a7ea4' },
        style,
      ]}
      {...rest}
    >
      {type === 'title' && isString && (
        <>
          <Text style={styles.firstLetter}>{firstLetter}</Text>
          <Text style={styles.restOfText}>{restOfText}</Text>
        </>
      )}
      {type !== 'title' && children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    // Basic styles if needed
  },
  firstLetter: {
    fontSize: 110,
    fontFamily: 'BalooTamma2_800ExtraBold',
  },
  restOfText: {
    fontSize: 65,
    fontFamily: 'BalooTamma2_800ExtraBold',
  },
});
