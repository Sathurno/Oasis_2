import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import ScrollView from '../components/ScrollView';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { ThemedText } from "../components/ThemedText";
import Header from '../components/Header';
import MicroMenu from '../components/MicroMenu';
import BatteryButtons from '../components/BatteryButtons';
import BatteryInfo from '../components/BatteryInfo';
import HeaderSection from '../components/HeaderSection';
import colors from '../constants/Colors';

type HomePageNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomePageRouteProp = RouteProp<RootStackParamList, 'Home'>;

interface Props {
    navigation: HomePageNavigationProp;
    route: HomePageRouteProp;
}

const Home: React.FC<Props> = ({ navigation, route }) => {
    const { t } = useTranslation();
    const [currentBatteryIndex, setCurrentBatteryIndex] = useState(0);
    const [currentLockerIndex, setCurrentLockerIndex] = useState(0);
    const [isLocker, setIsLocker] = useState(false); // Estado para controlar la vista (Baterías o Taquillas)

    // Datos simulados de las baterías
    const [batteries, setBatteries] = useState([
        {
            id: '3PQR7',
            name: 'Batería 3PQR7',
            totalRemaining: '30%',
            accumulatedCost: '8,90€',
            startTime: '10/05/2024 12h00'
        }
    ]);

    useEffect(() => {
        if (route.params?.newBattery) {
            const newBattery = route.params.newBattery;
            setBatteries(prev => {
                // Evitar duplicados
                if (prev.some(b => b.id === newBattery.id)) return prev;
                
                const updated = [...prev, newBattery];
                // Actualizar índice para mostrar la nueva batería
                setCurrentBatteryIndex(updated.length - 1);
                return updated;
            });
            // Limpiar parámetros para evitar añadirla de nuevo
            navigation.setParams({ newBattery: undefined });
        }
    }, [route.params?.newBattery]);

    // Datos simulados de las taquillas
    const [lockers, setLockers] = useState([
        {
            id: 'T001',
            name: 'Taquilla T001',
            location: 'Estación Central',
            accumulatedCost: '3,20€',
            startTime: '10/05/2024 14h00'
        },
        {
            id: 'T045',
            name: 'Taquilla T045',
            location: 'Plaza Mayor',
            accumulatedCost: '1,80€',
            startTime: '10/05/2024 16h30'
        },
        {
            id: 'T089',
            name: 'Taquilla T089',
            location: 'Centro Comercial',
            accumulatedCost: '4,50€',
            startTime: '10/05/2024 11h15'
        }
    ]);

    const handleBatteryReturnConfirmation = () => {
        // Eliminar la batería actual del array
        const newBatteries = batteries.filter((_, index) => index !== currentBatteryIndex);
        setBatteries(newBatteries);
        
        // Ajustar el índice si es necesario
        if (currentBatteryIndex >= newBatteries.length && newBatteries.length > 0) {
            setCurrentBatteryIndex(newBatteries.length - 1);
        } else if (newBatteries.length === 0) {
            setCurrentBatteryIndex(0);
        }
    };

    const handleLockerReturnConfirmation = () => {
        // Eliminar la taquilla actual del array
        const newLockers = lockers.filter((_, index) => index !== currentLockerIndex);
        setLockers(newLockers);
        
        // Ajustar el índice si es necesario
        if (currentLockerIndex >= newLockers.length && newLockers.length > 0) {
            setCurrentLockerIndex(newLockers.length - 1);
        } else if (newLockers.length === 0) {
            setCurrentLockerIndex(0);
        }
    };

    const handleNextBattery = () => {
        setCurrentBatteryIndex((prevIndex) => (prevIndex + 1) % batteries.length);
    };

    const handlePrevBattery = () => {
        setCurrentBatteryIndex((prevIndex) => (prevIndex - 1 + batteries.length) % batteries.length);
    };

    const handleNextLocker = () => {
        setCurrentLockerIndex((prevIndex) => (prevIndex + 1) % lockers.length);
    };

    const handlePrevLocker = () => {
        setCurrentLockerIndex((prevIndex) => (prevIndex - 1 + lockers.length) % lockers.length);
    };

    const currentBattery = batteries[currentBatteryIndex];
    const currentLocker = lockers[currentLockerIndex];

    return (
        <ScrollView>
            <View style={styles.container}>
                {/* Encabezado */}
                <Header navigation={navigation} />
                <HeaderSection isLocker={isLocker} onSwitch={() => setIsLocker(!isLocker)} />

                {isLocker ? (
                    // Vista de Taquillas
                    lockers.length > 0 && currentLocker ? (
                        <>
                            <ThemedText type="subtitle" style={styles.lockerName}>{currentLocker.name}</ThemedText>
                            <BatteryInfo
                                totalRemaining={currentLocker.location}
                                accumulatedCost={currentLocker.accumulatedCost}
                                startTime={currentLocker.startTime}
                                onNext={handleNextLocker}
                                onPrev={handlePrevLocker}
                                isLocker={true}
                            />
                            <BatteryButtons returnButtonText='Devolver' onReturnConfirm={handleLockerReturnConfirmation} />
                        </>
                    ) : (
                        <>
                            <ThemedText type="subtitle" style={styles.noBatteryText}>
                                No tienes ninguna taquilla alquilada.
                            </ThemedText>
                            <TouchableOpacity style={styles.container2} onPress={() => navigation.navigate('Search')}>
                                <ThemedText style={styles.registerLink} type="subtitle" sizeText={18}>
                                    {t('Search for a battery')}
                                </ThemedText>
                            </TouchableOpacity>
                        </>
                    )
                ) : (
                    // Vista de Baterías Portátiles
                    batteries.length > 0 && currentBattery ? (
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
                            <BatteryButtons returnButtonText='Devolver' onReturnConfirm={handleBatteryReturnConfirmation} />
                        </>
                    ) : (<>
                        <ThemedText type="subtitle" style={styles.noBatteryText}>
                            No tienes ninguna batería alquilada.
                        </ThemedText>
                        <TouchableOpacity style={styles.container2} onPress={() => navigation.navigate('Search')}>
                            <ThemedText style={styles.registerLink} type="subtitle" sizeText={18}>
                                {t('Search for a battery')}
                            </ThemedText>
                        </TouchableOpacity>
                    </>)
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
    lockerName: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    noBatteryText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 50,
        color: 'gray',
    }, 
    container2: {
        width: 200,
        alignItems: 'center',
    },
    registerLink: {
        color: colors.azul,
    },
});

export default Home;
