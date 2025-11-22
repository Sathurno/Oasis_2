import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import LogButton from '../components/LogButton'; // Importa tu componente LogButton
import colors from '../constants/Colors'; // Asegúrate de importar tus colores

interface ActionButtonsProps {
    returnButtonText: string;
    onReturnConfirm: () => void; // Función que se ejecutará cuando se confirme la devolución
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ returnButtonText, onReturnConfirm }) => {
    const { t } = useTranslation();

    const handleReturnPress = () => {
        Alert.alert(
            "Confirmación",
            "¿Estás seguro de que deseas devolver la batería?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Confirmar", onPress: onReturnConfirm } // Llama a la función cuando se confirme
            ]
        );
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
                onPress={() => Alert.alert("Información", "Detalles de la batería...")}
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
    },
});

export default ActionButtons;
