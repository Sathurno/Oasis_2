import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, Image, TextInput, Animated, FlatList, TouchableOpacity, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import ScrollView from '../components/ScrollView';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import Header from '../components/Header';
import MicroMenu from '../components/MicroMenu';
import { ThemedText } from "../components/ThemedText";
import colors from "../constants/Colors";
import LogButton from "../components/LogButton";

type HomePageNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
    navigation: HomePageNavigationProp;
}

const Result: React.FC<Props> = ({ navigation }) => {
    const { t } = useTranslation();

    // Animación para la imagen flotante
    const moveAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const startFloatingAnimation = () => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(moveAnim, {
                        toValue: 10, // Mover hacia abajo
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(moveAnim, {
                        toValue: 0, // Mover hacia arriba
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                ]),
            ).start();
        };

        startFloatingAnimation();
    }, [moveAnim]);

    return (
      <ScrollView>
        <View style={styles.container}>
                <Header navigation={navigation} />
                <ThemedText type="subtitle" style={styles.title}>Oasis del Puerto</ThemedText>
                <View style={styles.batteryInfoContainer}>
                <Text style={styles.batteryInfoText}>
                    <Text style={styles.batteryTitle}>{t('Tiempo estimado')}:    </Text>
                    {"10 minutos"}
                </Text>
                <Text style={styles.ciclismo}> 5 minutos</Text>
                <Image source={require('../assets/images/Ícono_ciclismo.png')} style={styles.icono1} />
                <Image source={require('../assets/images/Ícono_caminata.png')} style={styles.icono2} />
                <View style={styles.googleMaps}>
                    <LogButton 
                        mode="text" 
                        title={t('Ver en Google Maps')} 
                        textColor="#4461F2" 
                        sizeText={12}
                        onPress={() => alert("Abriendo Google Maps...")}
                    />
                    <Image source={require('../assets/images/Ícono_googleMaps.png')} style={styles.maps} />
                </View>
            </View>

                {/* Mostrar siempre la isla flotante */}
                <Animated.Image
                    source={require('../assets/images/Garden.png')}
                    style={[styles.imageBackground, { transform: [{ translateY: moveAnim }] }]}
                />
                <MicroMenu navigation={navigation} currentScreen='Search' />
        </View>
      </ScrollView>  
    );    
}


const styles = StyleSheet.create({
    imageBackground: {
        position: 'absolute',
        alignSelf: 'center',
        width: 320,
        height: 340,
        top: 300, // Ajuste para que quede en el fondo
        left: 5,
        zIndex: -5,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
    batteryInfoContainer: {
        marginBottom: 50,
        width: 250,
        alignSelf: "center",

    },
    batteryInfoText: {
        fontSize: 16,
        color: colors.negro,
        marginBottom: 5,
        fontFamily: 'BalooTamma2_400Regular', // Fuente regular
    },
    batteryTitle: {
        fontFamily: 'BalooTamma2_800ExtraBold', // Solo los títulos con fuente en negrita
    },
    icono1: {
        position: 'absolute',
        right: -20,
        top: 40,
        width: 30,
        height: 30,
    },
    ciclismo: {
        position: 'absolute',
        right: 40,
        top: 40,
    },
    icono2: {
        position: 'absolute',
        right: -20,
        top: -5,
        width: 30,
        height: 30,
    },
    maps:{
        width: 25,
        height: 25,
        marginLeft: -15,
        marginTop: -10,
    },
    googleMaps: {
        flexDirection: 'row',
        position: 'absolute',
        top: 110,
        right: -50,
        justifyContent: 'center',
        alignItems: 'center',
    }
    
}); 

export default Result;