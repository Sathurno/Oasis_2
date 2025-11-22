import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import ScrollView from '../components/ScrollView';
import { useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { ThemedText } from "../components/ThemedText";
import Header from '../components/Header';
import MicroMenu from '../components/MicroMenu';
import BatteryInfo from '../components/BatteryInfo';
import HeaderSection from '../components/HeaderSection';
import colors from '../constants/Colors';

type HomeStackNavigationProp = StackNavigationProp<RootStackParamList, 'Home_stack'>;

interface Props {
    navigation: HomeStackNavigationProp;
}

const Home_stack: React.FC<Props> = ({ navigation }) => {
    const route = useRoute();
    const routeParams = (route.params as { tipo?: boolean }) || {};
    const tipo = routeParams?.tipo ?? false;
    const { t } = useTranslation();

    return (
        <ScrollView>
            <View style={styles.container}>
                {/* Encabezado */}
                <Header navigation={navigation} />
                <HeaderSection isLocker={tipo} onSwitch={() => { }} />

                {/* Información de la batería */}
                <ThemedText type="subtitle" style={styles.subtitle}>
                    {tipo ? t('Actualmente tienes 3 baterías en Taquilla') : t('Actualmente tienes 4 baterías')}
                </ThemedText>

                <View style={styles.stack}>
                    {/* Cambia las imágenes según el valor de `tipo` */}
                    {true ? (
                        <>
                            <Image style={[styles.images, { zIndex: 1 }]} source={require("../assets/images/Battery.gif")} />
                            <Image style={[styles.images, styles.lowerImage, { zIndex: 3 }]} source={require("../assets/images/Battery.gif")} />
                            <Image style={[styles.images, { zIndex: 1 }]} source={require("../assets/images/Battery.gif")} />
                        </>
                    ) : (
                        <>
                            <Image style={[styles.images, { zIndex: 4 }]} source={require("../assets/images/battery_high.png")} />
                            <Image style={[styles.images, { zIndex: 3 }]} source={require("../assets/images/battery_low.png")} />
                            <Image style={[styles.images, { zIndex: 2 }]} source={require("../assets/images/battery_medium.png")} />
                            <Image style={[styles.images, { zIndex: 1 }]} source={require("../assets/images/battery_high.png")} />
                        </>
                    )}
                </View>

                {/* Botón Continuar */}
                <TouchableOpacity 
                    style={styles.continuarButton} 
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={styles.continuarButtonText}>Continuar</Text>
                </TouchableOpacity>
                
                <MicroMenu navigation={navigation} currentScreen='Home_stack' />
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
    subtitle: {
        marginTop: 60,
        fontSize: 16,
        textAlign: 'center',
    },
    images: {
        width: 160,
        height: 350,
        marginHorizontal: -113,
        marginTop: -30,
    },
    stack: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    lowerImage: {
        marginTop: 20, // Desplaza las imágenes centrales hacia abajo
    },
    continuarButton: {
        backgroundColor: colors.azul,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        height: 50,
        width: 130,
        alignSelf: 'center',
        marginTop: 20,
    },
    continuarButtonText: {
        color: colors.blanco,
        fontSize: 16,
        textAlign: 'center',
    },
});

export default Home_stack;
