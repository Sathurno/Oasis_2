import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import colors from '../constants/Colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type HomePageNavigationProp = StackNavigationProp<RootStackParamList>;

interface Props {
    navigation: HomePageNavigationProp;
}

const MicroMenu: React.FC<Props> = ({ navigation }) => {
    const [selectedIcon, setSelectedIcon] = useState<string>('home'); // Estado para el icono seleccionado

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
        width: '100%',
        height: 100,
        marginTop: 740,
        marginLeft: 20,
        position: 'absolute',
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
