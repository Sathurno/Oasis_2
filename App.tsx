import React, { Suspense, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, View, Text } from 'react-native';
import { Canvas } from '@react-three/fiber/native';
import ScrollView from './components/ScrollView';
import useControls from 'r3f-native-orbitcontrols';
import { Earth } from './components/Earth2';
import LogButton from './components/LogButton'; // Ensure the correct path
import colors from './constants/Colors'

export default function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [OrbitControls, events] = useControls();

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>version 1.0</Text>
        <Text>OASIS</Text>
        <Image
          style={styles.gif}
          source={require('./assets/earth.gif')}
        />
        <View style={styles.subcontainer}>
        <LogButton title='Iniciar Sesión' buttonColor= {colors.azul} textColor='white'/> 
        <View style={styles.space}></View>
        <LogButton title='Registrarse' buttonColor= {colors.blanco} textColor='black'/> 
        </View>
        <LogButton mode='text' title='Skip>>' /> 
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  gif: {
    width: 370,
    height: 300,
    marginLeft: -90,
  },
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
  },
  subcontainer:{
    flexDirection: 'row',
  },
  space:{
    width: 10,
  }
});
