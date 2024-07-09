import React from 'react';
import { StyleSheet, View, Image, ImageSourcePropType } from 'react-native';

interface ScrollViewProps {
  children?: React.ReactNode;
  imageSource?: ImageSourcePropType; // Make imageSource optional
}

const defaultImageSource = require('../assets/images/Background.png'); // Define a default image

const ScrollView: React.FC<ScrollViewProps> = ({ children, imageSource }) => {
  const backgroundImage = imageSource || defaultImageSource; // Use passed image or default

  return (
    <View style={styles.container}>
      <Image source={backgroundImage} style={styles.backgroundImage} />
      <View style={styles.contentContainer}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject, // Fill the container
    width: '100%',
    height: '100%',
    zIndex: -1, // Ensure the image is behind the content
    marginTop:200,
  },
  contentContainer: {
    flex: 1,
    zIndex: 1, // Ensure content is above the background image
  },
});

export default ScrollView;
