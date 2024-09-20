import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import colors from '../constants/Colors'; // Asegúrate de importar tus colores

interface BatteryInfoProps {
    totalRemaining: string; // Porcentaje de batería restante
    accumulatedCost: string; // Coste acumulado
    startTime: string; // Fecha y hora de inicio
}

const BatteryInfo: React.FC<BatteryInfoProps> = ({ totalRemaining, accumulatedCost, startTime }) => {
    const { t } = useTranslation(); // Traducción

    return (
        <View>
            <View style={styles.batteryInfoContainer}>
                <Text style={styles.batteryInfoText}>
                    <Text style={styles.batteryTitle}>{t('Total restante')}: </Text>
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
                <Image source={require('../assets/images/Ícono_arrow_delgada.png')} style={styles.arrowReverse}></Image>
                <Image source={require('../assets/images/battery_low.png')} style={styles.batteryImage} />
                <Image source={require('../assets/images/Ícono_arrow_delgada.png')} style={styles.arrow}></Image>
                
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
    arrow:{
        width:40,
        height: 40,
    },
    arrowReverse:{
        width:40,
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
});

export default BatteryInfo;
