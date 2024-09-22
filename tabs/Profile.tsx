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
                {/* Avatar y Fondo */}
                <View style={styles.header}>
                    <Image source={require('../assets/images/Background.png')} style={styles.backgroundImage} />
                    <View style={styles.avatarContainer}>
                        <Image source={require('../assets/images/Ícono_foto.png')} style={styles.avatar} />
                        <TouchableOpacity style={styles.editButton}>
                            <Image source={require('../assets/images/Ícono_foto.png')} style={styles.editIcon} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Campos de Texto */}
                <View style={styles.inputContainer}>
                    <ThemedText type="subtitle" style={styles.label}>{t('name')}</ThemedText>
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        placeholder={t('enter_name')}
                        placeholderTextColor={colors.gray}
                        style={[styles.input, styles.textInput]}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <ThemedText type="subtitle" style={styles.label}>{t('email')}</ThemedText>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder={t('enter_email')}
                        placeholderTextColor={colors.gray}
                        style={[styles.input, styles.textInput]}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                {/* Botones */}
                <View style={styles.buttonContainer}>
                    <LogButton
                        title={t('change_password')}
                        buttonColor={colors.azul}
                        textColor="white"
                        sizeText={17}
                        style={{ width: "100%", marginBottom: 10 }}
                    />
                    <LogButton
                        title={t('logout')}
                        buttonColor={colors.gray}
                        textColor="white"
                        sizeText={17}
                        style={{ width: "100%" }}
                    />
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
    header: {
        width: "100%",
        alignItems: "center",
        marginBottom: 20,
    },
    backgroundImage: {
        position: "absolute",
        width: "100%",
        height: 150,
        top: 0,
    },
    avatarContainer: {
        alignItems: "center",
        marginTop: 50,
    },
    avatar: {
        width: 100,
        height: 100,
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
        width: 20,
        height: 20,
    },
    inputContainer: {
        width: "100%",
        marginBottom: 20,
    },
    label: {
        marginBottom: 5,
        fontSize: 16,
    },
    input: {
        width: "100%",
        height: 50,
        borderColor: colors.gray,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: colors.blanco,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    textInput: {
        fontSize: 16,
    },
    buttonContainer: {
        width: "100%",
        marginBottom: 20,
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