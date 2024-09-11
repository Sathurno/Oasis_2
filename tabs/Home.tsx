import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ViewBase } from 'react-native';
import { useTranslation } from 'react-i18next';
import ScrollView from '../components/ScrollView';
import colors from '../constants/Colors';
import DropDownPicker from 'react-native-dropdown-picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { ThemedText } from "../components/ThemedText";
import LogButton from "../components/LogButton";

type HomePageNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
    navigation: HomePageNavigationProp;
}

const Home: React.FC<Props> = ({ navigation }) => {
    const { t } = useTranslation();
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [menuValue, setMenuValue] = useState<string | null>(null);
    const [menuItems] = useState([
        { label: t('Ayuda'), value: 'help', icon: () => <Image source={require('../assets/images/Ícono_lupa.png')} style={styles.icon} /> },
        { label: t('Autores'), value: 'authors', icon: () => <Image source={require('../assets/images/Ícono_lupa.png')} style={styles.icon} /> }
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
        <ScrollView>
            <View style={styles.container}>
                {/* Encabezado con usuario, avatar y dropdown */}
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
                <View style={{flexDirection:"row", justifyContent: "center", alignItems: "center", marginBottom: 10}}>
                    <ThemedText type="subtitle" style={styles.title}>{t('Baterías Portátiles')}</ThemedText>
                    <View style= {{flexDirection: "column", marginTop: -10}}>
                        <Image 
                                source={require('../assets/images/Ícono_arrow-black-bottom.png') } // Reemplaza con la ruta de tu avatar
                                style={{        
                                    width: 20,
                                    height: 20,
                                    zIndex:3,
                                    transform: [{ rotate: '180deg' }],
                                }} 
                        />
                        <Image 
                                source={require('../assets/images/Ícono_arrow-black-bottom.png') } // Reemplaza con la ruta de tu avatar
                                style={styles.menuIcons} 
                        />
                    </View>
                </View>
        
                {/* Información de la batería seleccionada */}
                <ThemedText type="subtitle" style={styles.batteryName}>Batería 1JKL5</ThemedText>
                {/* Información de la batería */}
                <View style={styles.batteryInfoContainer}>
                <Text style={styles.batteryInfoTitle}>
                    <Text style={styles.batteryInfoText}>{t('Total restante')}</Text>: 60%
                </Text>
                <Text style={styles.batteryInfoTitle}>
                    <Text style={styles.batteryInfoText}>{t('Coste acumulado')}</Text>: 5,45€
                </Text>
                <Text style={styles.batteryInfoTitle}>
                    <Text style={styles.batteryInfoText}>{t('Inicio')}</Text>: 10/05/2024 15h30
                </Text>
                </View>

                {/* Imagen de la batería */}
                <View style={styles.batteryImageContainer}>
                    <Image 
                        source={require('../assets/images/battery_low.png')} // Reemplaza con la ruta de la imagen de la batería
                        style={styles.batteryImage} 
                    />
                </View>
                {/* Botón de devolver */}
                <TouchableOpacity style={styles.returnButton}>
                    <Text style={styles.returnButtonText}>{t('Devolver')}</Text>
                </TouchableOpacity>
                <LogButton mode="text" title={t('More Information')} textColor="#4461F2" sizeText={12}/>
                <View style={styles.microMenu}>
                <View style={styles.rectangle}>
                    <View style={styles.innerRectangle}>
                        <View style={{flexDirection:"column", alignItems:"center"}}>
                            <Image 
                                source={require('../assets/images/Ícono_home.png') } // Reemplaza con la ruta de tu avatar
                                style={styles.menuIcons} 
                                
                            />
                            <View style={styles.blueCircle}></View>
                        </View>
                        <Image 
                            source={require('../assets/images/Ícono_lupa.png') } // Reemplaza con la ruta de tu avatar
                            style={styles.menuIcons} 
                        />
                        <Image 
                            source={require('../assets/images/Ícono_notificación.png') } // Reemplaza con la ruta de tu avatar
                            style={styles.menuIcons} 
                        />
                         <Image 
                            source={require('../assets/images/Ícono_usuario.png') } // Reemplaza con la ruta de tu avatar
                            style={styles.menuIconUser} 
                        />
                    </View>
                </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    rectangle: {
        width: "90%", // Ajusta el ancho del rectángulo
        height: 60, // Ajusta la altura del rectángulo
        borderRadius: 15, // Bordes redondeados
        backgroundColor: '#f0f4ff', // Color de fondo
        shadowColor: '#000', // Color de la sombra
        shadowOffset: { width: 0, height: 5 }, // Desplazamiento de la sombra
        shadowOpacity: 0.1, // Opacidad de la sombra
        shadowRadius: 10, // Radio de la sombra
        elevation: 5, // Elevación en Android para sombras
      },
      innerRectangle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 40,
        borderRadius: 20,
        backgroundColor: 'transparent', // Color interior para simular un leve degradado
        
    },
    blueCircle: {
        width: 7,
        height: 7,
        borderRadius: 5,
        backgroundColor: colors.azul,
        marginTop: 5,
    },
    microMenu:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 100,
        marginTop: 30,
    },
    whiteZone:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 60,
        backgroundColor: "#e2e7f9",
        marginTop: 30,
        borderRadius: 15,
    },
    placeholderStyle: {
        fontSize: 11,
        marginLeft: -10,
    },
    dropdown: {
        borderWidth: 0,
        height: 50,
    },
    dropdownText: {
        fontFamily: 'BalooTamma2_800',
        color: 'black',
    },
    dropdownContainerWrapper: {
        width: '100%',
        alignItems: 'flex-end',
        zIndex: 1,
    },
    dropdownContainer: {
        width: 150,
        backgroundColor: 'white',
        borderWidth: 0,
        marginTop: -75,
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 50,
        marginTop: 20,
        width: '28%',
    },
    userInfo: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 20,
        marginRight: 3,
        marginTop: 10,
        zIndex: 1,
    },
    scanning: {
        width: 35,
        height: 35,
        marginTop: 10,
        marginLeft: 145,
        zIndex: 1,
    },
    ellipse: {
        width: 20,
        height: 20,
        zIndex:3,
        marginLeft: 35,
        marginTop: -20,

    },
    menuIcons: {
        width: 20,
        height: 20,
        zIndex:3,
        marginTop: -5,

    },
    menuIconUser: {
        width: 16,
        height: 21,
        zIndex:3,

    },
    welcomeText: {
        fontSize: 14,
        color: colors.gray,
    },
    userName: {
        fontSize: 13,
        marginTop: -15,
        zIndex: 2,
    },
    title: {
        fontSize: 26,
        textAlign: 'center',
        marginRight: 10,
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
        fontFamily: 'BalooTamma2_800ExtraBold',
    },
    batteryInfoTitle: {
        fontSize: 16,
        color: colors.negro,
        marginBottom: 5,
    },
    batteryImageContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: 60,
    },
    batteryImage: {
        width: 420,
        height: 150,
    },
    batteryName: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    returnButton: {
        backgroundColor: colors.azul,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        height: 40,
        width: 130,
        alignSelf: 'center',
    },
    returnButtonText: {
        color: colors.blanco,
        fontSize: 16,
        marginTop: -7,
        fontFamily: 'BalooTamma2_800ExtraBold',
    },
});

export default Home;
