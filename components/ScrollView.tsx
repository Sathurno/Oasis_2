import React from 'react';
import { StyleSheet, View, Image, ImageSourcePropType } from 'react-native';

interface ScrollViewProps {
  children?: React.ReactNode;
  imageSource?: ImageSourcePropType; // Hacer opcional la fuente de la imagen
}

const defaultImageSource = require('../assets/images/Background.png'); // Definir una imagen por defecto

const ScrollView: React.FC<ScrollViewProps> = ({ children, imageSource }) => {
  const backgroundImage = imageSource || defaultImageSource; // Usar la imagen pasada o la por defecto

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {children}
      </View>
      <View style={styles.imageContainer}>
        <Image source={backgroundImage}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    backgroundColor: "#fefefe",
  },
  imageContainer: {
    flex: 1,
    zIndex:1,
    alignItems: "center",
    justifyContent: "center",
    marginRight:200,
  },
  contentContainer: {
    flex: 1,
  },
});

export default ScrollView;