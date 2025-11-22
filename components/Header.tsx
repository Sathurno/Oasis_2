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
                        <View style={styles.dropdownWrapper}>
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
                                arrowIconContainerStyle={styles.arrowIconContainer} // Estilo para el contenedor de la flecha
                                arrowIconStyle={styles.arrowIcon} // Estilo para la flecha
                            />
                        </View>
                        <ThemedText type="subtitle" style={styles.userName}>Ariana Grinder</ThemedText>
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
        justifyContent: 'flex-start', // Alinea todo a la izquierda
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 40, // Un poco más de espacio superior para la barra de estado
        width: '100%', // Ocupar todo el ancho disponible
        paddingHorizontal: 10, // Añadir padding lateral para que no pegue a los bordes
    },
    userInfo: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        flex: 1, // Permite que este contenedor ocupe el espacio central
        marginLeft: 10, // Espacio entre la imagen y el texto
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
        marginLeft: 'auto', // Empuja el icono de scanning a la derecha
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
    dropdownWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 'auto',
    },
    dropdown: {
        borderWidth: 0,
        minHeight: 30,
        width: 90,
        paddingHorizontal: 0,
        paddingRight: 5,
        backgroundColor: 'transparent',
    },
    iconRotated: {

    },
    dropdownText: {
        fontFamily: 'BalooTamma2_800ExtraBold',
        color: 'black',
        fontSize: 11,
    },
    dropdownContainerWrapper: {
        width: 90,
        alignItems: 'flex-start',
        zIndex: 1000,
        marginBottom: 10,
    },
    dropdownContainer: {
        width: 120,
        borderWidth: 1,
        borderColor: '#000000',
        marginTop: 2,
        borderRadius: 4,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    placeholderStyle: {
        fontSize: 11,
        fontFamily: 'BalooTamma2_800ExtraBold',
        color: 'black',
        paddingRight: 0,
        marginRight: 0,
    },
    arrowIconContainer: {
        paddingLeft: 3,
        paddingRight: 0,
        marginLeft: 0,
    },
    arrowIcon: {
        width: 10,
        height: 10,
    },
    userName: {
        fontSize: 13,
        marginTop: -5,
        zIndex: -1,
    },
});

export default Header;
