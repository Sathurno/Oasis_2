import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ViewBase } from 'react-native';
import { useTranslation } from 'react-i18next';
import DropDownPicker from 'react-native-dropdown-picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { ThemedText } from "../components/ThemedText";

type HomePageNavigationProp = StackNavigationProp<RootStackParamList>;

interface Props {
    navigation: HomePageNavigationProp;
}

const Header: React.FC<Props> = ({ navigation }) => {
    const { t } = useTranslation();
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [menuValue, setMenuValue] = useState<string | null>(null);
    const [menuItems] = useState([
        { label: t('Ayuda'), value: 'help', icon: () => <Image source={require('../assets/images/Ícono_ayuda.png')} style={styles.icon} /> },
        { label: t('Autores'), value: 'authors', icon: () => <Image source={require('../assets/images/Ícono_Autores.png')} style={styles.icon} /> }
    ]);

    const handleMenuChange = (value: string | null) => {
        // Realiza la navegación según el valor seleccionado
        if (value) {
            navigation.navigate('Register'); // Cambia esto según tu lógica de navegación
        }
        // Reinicia el valor del dropdown a null para que siempre muestre "Bienvenida"
        setMenuValue(null);
        setMenuOpen(false);
    };

        return (
            <View style={styles.header}>
                    <View>
                        <Image 
                            source={require('../assets/images/Ícono_foto.png') } // Reemplaza con la ruta de tu avatar
                            style={styles.avatar} 
                        />
                        <Image 
                            source={require('../assets/images/Ellipse_orange.png') } // Reemplaza con la ruta de tu avatar
                            style={styles.ellipse} 
                        />
                    </View>
                    
                    <View style={styles.userInfo}>
                        <View>
                        <DropDownPicker
                                open={menuOpen}
                                value={menuValue}
                                items={menuItems}
                                setOpen={setMenuOpen}
                                setValue={setMenuValue}
                                onChangeValue={handleMenuChange}
                                style={styles.dropdown}
                                textStyle={styles.dropdownText}
                                dropDownContainerStyle={styles.dropdownContainer}
                                containerStyle={styles.dropdownContainerWrapper}
                                showTickIcon={false} // Oculta el ícono de selección (checkmark)
                                placeholder={t('BIENVENIDA')} // Siempre muestra "Bienvenida"
                                placeholderStyle={styles.placeholderStyle} // Estilo para el placeholder
                                arrowIconContainerStyle={{ justifyContent: 'flex-end' }} // Mueve el icono a la derecha
                            />
                            <ThemedText type="subtitle" style={styles.userName}>Ariana Grinder</ThemedText>

                        </View>
                    </View>
                    <Image 
                            source={require('../assets/images/Ícono_scanning.png') } // Reemplaza con la ruta de tu avatar
                            style={styles.scanning} 
                        />
                </View>
        );
}

const styles = StyleSheet.create({

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Distribuye los elementos a los extremos
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 40, // Un poco más de espacio superior para la barra de estado
        width: '100%', // Ocupar todo el ancho disponible
        paddingHorizontal: 10, // Añadir padding lateral para que no pegue a los bordes
    },
    userInfo: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1, // Permite que este contenedor ocupe el espacio central
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 20,
        // Eliminado marginRight y marginTop fijos innecesarios
    },
    scanning: {
        width: 35,
        height: 35,
        // Eliminado marginLeft: 145 y marginTop
    },
    ellipse: {
        width: 20,
        height: 20,
        zIndex:3,
        marginLeft: 35,
        marginTop: -20,

    },
    icon: {
        width: 20,
        height: 20,
    },
    dropdown: {
        borderWidth: 0,
    },
    iconRotated: {

    },
    dropdownText: {
        fontFamily: 'BalooTamma2_800ExtraBold',
        color: 'black',
    },
    dropdownContainerWrapper: {
        width: '100%',
        alignItems: 'flex-end',
        zIndex: 1,
        marginBottom: 10,
    },
    dropdownContainer: {
        width: 150,
        borderWidth: 0,
        marginTop: -15,
        maxWidth: 110,
    },
    placeholderStyle: {
        fontSize: 11,
        marginLeft: -10,
        
    },
    userName: {
        fontSize: 13,
        marginTop: -15,
        zIndex: -1,
    },
});

export default Header;
