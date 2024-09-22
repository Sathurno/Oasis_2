import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import ScrollView from '../components/ScrollView';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { ThemedText } from "../components/ThemedText";
import Header from '../components/Header';
import MicroMenu from '../components/MicroMenu';
import BatteryButtons from '../components/BatteryButtons';
import BatteryInfo from '../components/BatteryInfo';
import HeaderSection from '../components/HeaderSection';


type HomePageNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
    navigation: HomePageNavigationProp;
}

const Home: React.FC<Props> = ({ navigation }) => {
    const { t } = useTranslation();

    return (
        <ScrollView>
            <View style={styles.container}>
                {/* Encabezado */}
                <Header navigation={navigation} />
                <HeaderSection isLocker={false} ></HeaderSection>
                {/* Información de la batería */}
                <ThemedText type="subtitle" style={styles.batteryName}>Batería 1JKL5</ThemedText>
                <BatteryInfo
                    totalRemaining="60%"         // Porcentaje de batería
                    accumulatedCost="5,45€"      // Coste acumulado
                    startTime="10/05/2024 15h30" // Fecha y hora de inicio
                />
                <BatteryButtons returnButtonText='Devolver' ></BatteryButtons>
                <MicroMenu navigation={navigation} currentScreen='Home' />
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
    batteryName: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    }
});

export default Home;
