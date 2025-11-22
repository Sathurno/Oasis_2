import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert, Animated } from 'react-native';
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
    
    // Valores animados para la posición y opacidad
    const slideAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(1)).current;
    
    // Referencia para rastrear la dirección del cambio
    const directionRef = useRef<'next' | 'prev'>('next');
    const prevPropsRef = useRef({ totalRemaining, accumulatedCost, startTime });
    const isFirstRender = useRef(true);

    // Detectar cambios en las props para animar
    useEffect(() => {
        // Evitar animación en el primer render
        if (isFirstRender.current) {
            isFirstRender.current = false;
            prevPropsRef.current = { totalRemaining, accumulatedCost, startTime };
            return;
        }

        const hasChanged = 
            prevPropsRef.current.totalRemaining !== totalRemaining ||
            prevPropsRef.current.accumulatedCost !== accumulatedCost ||
            prevPropsRef.current.startTime !== startTime;

        if (hasChanged) {
            // Animación de salida: mover en dirección contraria y desaparecer
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: directionRef.current === 'next' ? -300 : 300,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                // Resetear posición y opacidad para la nueva batería
                slideAnim.setValue(directionRef.current === 'next' ? 300 : -300);
                opacityAnim.setValue(0);
                
                // Animación de entrada: aparecer desde la dirección del scroll
                Animated.parallel([
                    Animated.timing(slideAnim, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacityAnim, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                ]).start();
            });
        }

        prevPropsRef.current = { totalRemaining, accumulatedCost, startTime };
    }, [totalRemaining, accumulatedCost, startTime]);

    const handleNext = () => {
        directionRef.current = 'next';
        onNext();
    };

    const handlePrev = () => {
        directionRef.current = 'prev';
        onPrev();
    };

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
                <TouchableOpacity onPress={handlePrev} style={{ zIndex: 10 }}>
                    <Image source={require('../assets/images/Ícono_arrow_delgada.png')} style={styles.arrowReverse}></Image>
                </TouchableOpacity>
                
                <Animated.View
                    style={[
                        styles.animatedContainer,
                        {
                            transform: [{ translateX: slideAnim }],
                            opacity: opacityAnim,
                        },
                    ]}
                >
                    <Image 
                        source={isLocker ? require('../assets/images/casilleros.png') : require('../assets/images/battery_low.png')} 
                        style={isLocker ? styles.lockerImage : styles.batteryImage} 
                    />
                </Animated.View>
                
                <TouchableOpacity onPress={handleNext} style={{ zIndex: 10 }}>
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
    animatedContainer: {
        overflow: 'hidden',
    },
});

export default BatteryInfo;
