import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import colors from '../constants/Colors'; // Asegúrate de importar tus colores

interface BatteryInfoProps {
    totalRemaining: string; // Porcentaje de batería restante o ubicación
    accumulatedCost: string; // Coste acumulado
    startTime: string; // Fecha y hora de inicio
    onNext: () => void;
    onPrev: () => void;
    isLocker?: boolean; // Indica si es una taquilla
}

const BatteryInfo: React.FC<BatteryInfoProps> = ({ totalRemaining, accumulatedCost, startTime, onNext, onPrev, isLocker = false }) => {
    const { t } = useTranslation(); // Traducción

    return (
        <View>
            <View style={styles.batteryInfoContainer}>
                <Text style={styles.batteryInfoText}>
                    <Text style={styles.batteryTitle}>{isLocker ? t('Ubicación') : t('Total restante')}: </Text>
                    {totalRemaining}
                </Text>
                <Text style={styles.batteryInfoText}>
                    <Text style={styles.batteryTitle}>{t('Coste acumulado')}: </Text>
                    {accumulatedCost}
                </Text>
                <Text style={styles.batteryInfoText}>
                    <Text style={styles.batteryTitle}>{t('Inicio')}: </Text>
                    {startTime}
                </Text>
            </View>

            {/* Imagen y botón */}
            <View style={styles.batteryImageContainer}>
                <TouchableOpacity onPress={onPrev} style={{ zIndex: 10 }}>
                    <Image source={require('../assets/images/Ícono_arrow_delgada.png')} style={styles.arrowReverse}></Image>
                </TouchableOpacity>
                
                <Image 
                    source={isLocker ? require('../assets/images/casilleros.png') : require('../assets/images/battery_low.png')} 
                    style={isLocker ? styles.lockerImage : styles.batteryImage} 
                />
                
                <TouchableOpacity onPress={onNext} style={{ zIndex: 10 }}>
                    <Image source={require('../assets/images/Ícono_arrow_delgada.png')} style={styles.arrow}></Image>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    batteryInfoContainer: {
        marginBottom: 50,
        width: 250,
        alignSelf: "center",

    },
    arrow: {
        width: 40,
        height: 40,
    },
    arrowReverse: {
        width: 40,
        height: 40,
        transform: [{ rotate: '180deg' }],
    },
    batteryInfoText: {
        fontSize: 16,
        color: colors.negro,
        marginBottom: 5,
        fontFamily: 'BalooTamma2_400Regular', // Fuente regular
    },
    batteryTitle: {
        fontFamily: 'BalooTamma2_800ExtraBold', // Solo los títulos con fuente en negrita
    },
    batteryImageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 60,
        width: "100%",
    },
    batteryImage: {
        width: 420,
        height: 160,
        marginRight: -90,
        marginLeft: -90,
    },
    lockerImage: {
        width: 280,
        height: 120,
        resizeMode: 'contain',
    },
});

export default BatteryInfo;
