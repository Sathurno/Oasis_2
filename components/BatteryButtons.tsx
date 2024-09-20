import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import LogButton from '../components/LogButton'; // Importa tu componente LogButton
import MicroMenu from '../components/MicroMenu'; // Importa tu componente MicroMenu
import colors from '../constants/Colors'; // Asegúrate de importar tus colores

interface ActionButtonsProps {
    returnButtonText: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ returnButtonText }) => {
    const { t } = useTranslation(); // Traducción

    const handleReturnPress = () => {
        // Aquí gestionamos la navegación internamente según el texto del botón
        if (returnButtonText === t('Devolver')) {
            console.log('Navegando a pantalla de devolución');
            // Aquí puedes manejar la navegación, por ejemplo:
            // navigation.navigate('ReturnScreen');
        } else {
            console.log(`Navegando a pantalla según el texto: ${returnButtonText}`);
            // navigation.navigate('SomeOtherScreen');
        }
    };

    return (
        <View>
            <TouchableOpacity style={styles.returnButton} onPress={handleReturnPress}>
                <Text style={styles.returnButtonText}>{returnButtonText}</Text>
            </TouchableOpacity>
            
            <LogButton
                mode="text"
                title={t('More Information')}
                textColor="#4461F2"
                sizeText={12}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    returnButton: {
        backgroundColor: colors.azul,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        height: 50,
        width: 130,
        alignSelf: 'center',
    },
    returnButtonText: {
        color: colors.blanco,
        fontSize: 16,
        fontFamily: 'BalooTamma2_800ExtraBold',
    },
});

export default ActionButtons;