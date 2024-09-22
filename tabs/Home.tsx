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

    const handleReturnConfirmation = () => {
        setHasBattery(false); // Oculta la sección de la batería
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                {/* Encabezado */}
                <Header navigation={navigation} />
                <HeaderSection isLocker={false} />

                {hasBattery ? (
                    <>
                        {/* Información de la batería */}
                        <ThemedText type="subtitle" style={styles.batteryName}>Batería 1JKL5</ThemedText>
                        <BatteryInfo
                            totalRemaining="60%"
                            accumulatedCost="5,45€"
                            startTime="10/05/2024 15h30"
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
