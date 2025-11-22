import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import ScrollView from '../components/ScrollView';
import { StackNavigationProp } from '@react-navigation/stack';
import i18next from "../i18n";
import { RootStackParamList } from '../types';
import { ThemedText } from "../components/ThemedText";
import Header from '../components/Header';
import MicroMenu from '../components/MicroMenu';
import HeaderSection from '../components/HeaderSection';


type Home_emptyPageNavigationProp = StackNavigationProp<RootStackParamList, 'Home_empty'>;

interface Props {
    navigation: Home_emptyPageNavigationProp;
    tipo: boolean;
}

const Home_empty: React.FC<Props> = ({ navigation, tipo }) => {
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
                {/* Encabezado */}
                <Header navigation={navigation} />
                <HeaderSection isLocker={tipo} onSwitch={() => { }} ></HeaderSection>
                {/* Información de la batería */}
                <ThemedText type="subtitle" style={styles.subtitle}>No tienes ninguna batería aun</ThemedText>
                <Image style={styles.gif} source={require("../assets/relaxTime.gif")} />
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
    subtitle: {
        marginTop: 60,
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    gif: {
        width: 360,
        height: 260,
        marginBottom: 100,
    },
});

export default Home_empty;
