import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
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
import colors from '../constants/Colors';

type HomePageNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
    navigation: HomePageNavigationProp;
}

const Home: React.FC<Props> = ({ navigation }) => {
    const { t } = useTranslation();
    const [hasBattery, setHasBattery] = useState(true); // Estado para controlar si tiene batería alquilada
    const [currentBatteryIndex, setCurrentBatteryIndex] = useState(0);

    // Datos simulados de las baterías
    const batteries = [
        {
            id: '1JKL5',
            name: 'Batería 1JKL5',
            totalRemaining: '60%',
            accumulatedCost: '5,45€',
            startTime: '10/05/2024 15h30'
        },
        {
            id: '2MNO9',
            name: 'Batería 2MNO9',
            totalRemaining: '85%',
            accumulatedCost: '2,10€',
            startTime: '10/05/2024 16h15'
        },
        {
            id: '3PQR7',
            name: 'Batería 3PQR7',
            totalRemaining: '30%',
            accumulatedCost: '8,90€',
            startTime: '10/05/2024 12h00'
        }
    ];

    const handleReturnConfirmation = () => {
        setHasBattery(false); // Oculta la sección de la batería
    };

    const handleNextBattery = () => {
        setCurrentBatteryIndex((prevIndex) => (prevIndex + 1) % batteries.length);
    };

    const handlePrevBattery = () => {
        setCurrentBatteryIndex((prevIndex) => (prevIndex - 1 + batteries.length) % batteries.length);
    };

    const currentBattery = batteries[currentBatteryIndex];

    return (
        <ScrollView>
            <View style={styles.container}>
                {/* Encabezado */}
                <Header navigation={navigation} />
                <HeaderSection isLocker={false} />

                {hasBattery ? (
                    <>
                        {/* Información de la batería */}
                        <ThemedText type="subtitle" style={styles.batteryName}>{currentBattery.name}</ThemedText>
                        <BatteryInfo
                            totalRemaining={currentBattery.totalRemaining}
                            accumulatedCost={currentBattery.accumulatedCost}
                            startTime={currentBattery.startTime}
                            onNext={handleNextBattery}
                            onPrev={handlePrevBattery}
                        />
                        <BatteryButtons returnButtonText='Devolver' onReturnConfirm={handleReturnConfirmation} />
                    </>
                ) : (<>
                    <ThemedText type="subtitle" style={styles.noBatteryText}>
                        No tienes ninguna batería alquilada.
                    </ThemedText>
                    <TouchableOpacity style={styles.container2} onPress={() => navigation.navigate('Search')}>
                        <ThemedText style={styles.registerLink} type="subtitle" sizeText={18}>
                            {t('Serach for a battery')}
                        </ThemedText>
                    </TouchableOpacity>
                </>
                )}

                <MicroMenu navigation={navigation} currentScreen='Home' />
            </View>
        </ScrollView >
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
    },
    noBatteryText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 50,
        color: 'gray',
    }, container2: {
        width: 200, // Ajusta el ancho según sea necesario
        alignItems: 'center', // Centra el contenido horizontalmente
    },
    registerLink: {
        color: colors.azul,
    },
});

export default Home;
