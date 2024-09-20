import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Image, TextInput, Animated } from 'react-native';
import { useTranslation } from 'react-i18next';
import ScrollView from '../components/ScrollView';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import Header from '../components/Header';
import MicroMenu from '../components/MicroMenu';
import { ThemedText } from "../components/ThemedText";
import colors from "../constants/Colors";

type HomePageNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
    navigation: HomePageNavigationProp;
}

const Search: React.FC<Props> = ({ navigation }) => {
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
                {/* Encabezado */}
                <Header navigation={navigation} />
                
                <View style={styles.inputContainer}>
                    {/* Icono de lupa a la izquierda */}
                    <Image
                        source={require('../assets/images/Ícono_lupa.png')}
                        style={styles.iconLeft}
                    />
                    
                    {/* TextInput */}
                    <TextInput
                        placeholder={t('Ingresar dirección')}
                        placeholderTextColor={colors.gray}
                        style={[styles.input, styles.textInput]} // Añadido estilo de texto
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    
                    {/* Icono de configuración a la derecha */}
                    <Image
                        source={require('../assets/images/Ícono_configuration.png')}
                        style={styles.iconRight}
                    />
                </View>

                <View style={styles.centro}>
                    <ThemedText type="title" sizeText={45}>{t('Buscar Oasis')}</ThemedText>

                    {/* Imagen flotante */}
                    <Animated.Image
                        source={require('../assets/images/Garden.png')}
                        style={[styles.image, { transform: [{ translateY: moveAnim }] }]}
                    />
                </View>

                <MicroMenu navigation={navigation} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    centro: {
        alignItems: 'center',
        marginTop: 230,
    },
    batteryName: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    image: {
        width: 370,
        height: 400,
        marginTop: -280,
        zIndex: -1,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1, // Borde solo en la parte inferior
        borderColor: colors.gray, // Color del borde inferior
        backgroundColor: 'white',
        paddingHorizontal: 10,
        marginBottom: 20,
        width: "100%",
        height: 50,
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingLeft: 10,
    },
    textInput: {
        fontFamily: 'BalooTamma2_400Regular', // Usa el estilo de "subtitle"
    },
    iconLeft: {
        width: 20,
        height: 20,
        tintColor: colors.gray, // Para hacer que el color coincida con el diseño
    },
    iconRight: {
        width: 20,
        height: 20,
        tintColor: colors.gray, // Para hacer que el color coincida con el diseño
    },
});

export default Search;
