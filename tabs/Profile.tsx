import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, TextInput, Image } from "react-native";
import { useTranslation } from 'react-i18next';
import ScrollView from "../components/ScrollView";
import LogButton from "../components/LogButton";
import colors from "../constants/Colors";
import MicroMenu from '../components/MicroMenu';
import { ThemedText } from "../components/ThemedText";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import i18next from "../i18n";

type ProfilePageNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

interface Props {
    navigation: ProfilePageNavigationProp;
}

const Profile: React.FC<Props> = ({ navigation }) => {
    const [name, setName] = useState<string>('Ariana Grindel');
    const [email, setEmail] = useState<string>('arianGrindel23@gmail.com');
    const { t, i18n } = useTranslation();
    const [languageOpen, setLanguageOpen] = useState<boolean>(false);
    const [languageValue, setLanguageValue] = useState<string | null>(i18n.language);
    const [languageItems] = useState([
        { label: 'Inglés', value: 'en' },
        { label: 'Español', value: 'es' },
        { label: 'Alemán', value: 'de' }
    ]);

    const handleLanguageChange = (value: string | null) => {
        if (value) {
            i18next.changeLanguage(value);
            setLanguageValue(value);
            setLanguageOpen(false);
        }
    };
    return (
        <ScrollView>
            <View style={styles.container}>
            <Image source={require('../assets/images/Profile_wallpaper.png')} style={styles.backgroundImage} />
                {/* Avatar y Fondo */}
                <View style={styles.header}>
                    <View style={styles.ovalo}></View>
                    <View style={styles.avatarContainer}>
                        <Image source={require('../assets/images/Ícono_foto.png')} style={styles.avatar} />
                        <TouchableOpacity style={styles.editButton}>
                            <Image source={require('../assets/images/ajustes.png')} style={styles.editIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{width: "90%"}}>
                <ThemedText style={{alignSelf: "flex-start", marginBottom: 10,}}>Nombre</ThemedText>
                {/* Campos de Texto */}
                <View style={styles.inputContainer}>
                    <TextInput
                        value= {name}
                        onChangeText={setName}
                        placeholderTextColor={colors.gray}
                        style={[styles.input, styles.textInput]}
                    />
                </View>
                <ThemedText style={{alignSelf: "flex-start", marginBottom: 10,}}>Email</ThemedText>
                <View style={styles.inputContainer}>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholderTextColor={colors.gray}
                        style={[styles.input, styles.textInput]}
                        autoCapitalize="none"
                    />
                </View>

                {/* Botones */}
                <View style={styles.buttonContainer}>
                    <LogButton
                        title={t('Cambiar contraseña')}
                        buttonColor={colors.azul}
                        textColor="white"
                        sizeText={17}
                        style={{ width: "100%", marginBottom: 30 }}
                    />
                    <LogButton
                        title={t('Cerrar Sesión')}
                        buttonColor={"white"}
                        textColor= {colors.azul}
                        sizeText={17}
                        style={{ width: "100%" }}
                    />
                </View>
                <LogButton mode="text" title={t('Terminos y Condiciones')} textColor="#000000FF" />
                </View>

                <MicroMenu navigation={navigation} currentScreen="Profile" />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    ovalo: {
        width: "114%",
        height: 100,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: "#fefdfa",
        position: "absolute",
        top: 100,
        zIndex: 0,
    },
    header: {
        width: "100%",
        alignItems: "center",
        marginBottom: 20,
        marginTop: 40,
    },
    backgroundImage: {
        position: "absolute",
        width: "115%",
        height: 220,
        top: 0,
    },
    avatarContainer: {
        alignItems: "center",
        marginTop: 50,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 50,
    },
    editButton: {
        position: "absolute",
        right: 0,
        bottom: 0,
        backgroundColor: colors.blanco,
        borderRadius: 20,
        padding: 5,
    },
    editIcon: {
        width: 30,
        height: 30,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        backgroundColor: colors.blanco,
        borderColor: '#FFFFFF',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        width: "100%",
        height: 50,
        // Sombra en iOS
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    
        // Sombra en Android
        elevation: 2,
      },
      input: {
        flex: 1,
        fontSize: 16,
        paddingLeft: 10,
      },
      textInput: {
        fontFamily: 'BalooTamma2_800ExtraBold', // Usa el estilo de "subtitle"
      },
    label: {
        marginBottom: 5,
        fontSize: 16,
        marginLeft: 10,
    },
    buttonContainer: {
        width: "100%",
        marginBottom: 20,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    footer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: colors.gray,
    },
    footerIcon: {
        alignItems: "center",
    },
    icon: {
        width: 30,
        height: 30,
    },
});

export default Profile;