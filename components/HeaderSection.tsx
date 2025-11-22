import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ThemedText } from '../components/ThemedText';
import colors from '../constants/Colors';

interface HeaderSectionProps {
    isLocker: boolean; // Recibe la propiedad `isLocker`
    onSwitch: () => void; // Función para cambiar entre modos
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ isLocker, onSwitch }) => {
    const { t } = useTranslation();

    return (
        <View>
            <View style={styles.headerContainer}>
                <ThemedText type="subtitle" style={styles.title}>
                    {isLocker ? t('Taquillas') : t('Baterías Portátiles')}
                </ThemedText>

                <TouchableOpacity onPress={onSwitch} style={styles.iconContainer}>
                    <Image
                        source={require('../assets/images/Ícono_arrow-black-bottom.png')}
                        style={[
                            styles.icon,
                            isLocker && { opacity: 1 }, // Opacidad para "Taquillas"
                        ]}
                    />
                    <Image
                        source={require('../assets/images/Ícono_arrow-black-bottom.png')}
                        style={[
                            styles.iconRotated,
                            isLocker && { opacity: 0.3 }, // Opacidad inversa para "Taquillas"
                        ]}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.negro,
    },
    iconContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    icon: {
        width: 20,
        height: 20,
        zIndex: 3,
        transform: [{ rotate: '180deg' }],
        opacity: 0.3, // Opacidad inicial para "Baterías Portátiles"
    },
    iconRotated: {
        width: 20,
        height: 20,
        zIndex: 3,
        marginTop: -5,
        opacity: 1, // Opacidad inicial para "Baterías Portátiles"
    },
});

export default HeaderSection;
