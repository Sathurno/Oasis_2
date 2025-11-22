import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../constants/Colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type HomePageNavigationProp = StackNavigationProp<RootStackParamList>;

interface Props {
    navigation: HomePageNavigationProp;
    currentScreen: string;  // Nuevo prop para recibir la pantalla actual
}

const { width } = Dimensions.get('window');

const MicroMenu: React.FC<Props> = ({ navigation, currentScreen }) => {
    const [selectedIcon, setSelectedIcon] = useState<string>('home');

    useFocusEffect(
        React.useCallback(() => {
            // Cambiar el ícono seleccionado basado en la pantalla actual
            setSelectedIcon(currentScreen);
        }, [currentScreen])
    );

    const handleIconPress = (iconName: string) => {
        setSelectedIcon(iconName); // Cambiar el icono seleccionado
        navigation.navigate(iconName as keyof RootStackParamList);
    };

    return (
        <View style={styles.microMenu}>
            <View style={styles.rectangle}>
                <View style={styles.innerRectangle}>
                    <TouchableOpacity onPress={() => handleIconPress('Home')} style={{ alignItems: 'center' }}>
                        <Image
                            source={
                                selectedIcon === 'Home'
                                    ? require('../assets/images/Ícono_home_negrita.png') // Icono en negrita
                                    : require('../assets/images/Ícono_home.png') // Icono regular
                            }
                            style={styles.menuIcons}
                        />
                        {selectedIcon === 'Home' && <View style={styles.blueCircle} />}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleIconPress('Search')} style={{ alignItems: 'center' }}>
                        <Image
                            source={
                                selectedIcon === 'Search'
                                    ? require('../assets/images/Ícono_lupa_negrita.png') // Icono en negrita
                                    : require('../assets/images/Ícono_lupa.png') // Icono regular
                            }
                            style={styles.menuIcons}
                        />
                        {selectedIcon === 'Search' && <View style={styles.blueCircle} />}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleIconPress('Notifications')} style={{ alignItems: 'center' }}>
                        <Image
                            source={
                                selectedIcon === 'Notifications'
                                    ? require('../assets/images/Ícono_notificación_negrita.png') // Icono en negrita
                                    : require('../assets/images/Ícono_notificación.png') // Icono regular
                            }
                            style={styles.menuIcons}
                        />
                        {selectedIcon === 'Notifications' && <View style={styles.blueCircle} />}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleIconPress('Profile')} style={{ alignItems: 'center' }}>
                        <Image
                            source={
                                selectedIcon === 'Profile'
                                    ? require('../assets/images/Ícono_usuario_negrita.png') // Icono en negrita
                                    : require('../assets/images/Ícono_usuario.png') // Icono regular
                            }
                            style={styles.menuIconUser}
                        />
                        {selectedIcon === 'Profile' && <View style={styles.blueCircle} />}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    microMenu: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: width, // Usar el ancho total de la pantalla
        height: 100,
        bottom: 20, // Posición fija desde abajo
        position: 'absolute', // Flotante sobre el contenido
        zIndex: 10, // Asegurar que esté por encima de otros elementos
        alignSelf: 'center', // Centrar respecto al contenedor padre
    },
    rectangle: {
        width: "90%",
        height: 60,
        borderRadius: 15,
        backgroundColor: '#f0f4ff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    innerRectangle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    blueCircle: {
        width: 7,
        height: 7,
        borderRadius: 5,
        backgroundColor: colors.azul,
        marginTop: 5,
    },
    menuIcons: {
        width: 20,
        height: 20,
        marginTop: -5,
    },
    menuIconUser: {
        width: 16,
        height: 21,
    },
});

export default MicroMenu;
