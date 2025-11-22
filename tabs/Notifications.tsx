import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image, Dimensions, Alert, StatusBar, SafeAreaView } from "react-native";
import { useTranslation } from 'react-i18next';
import { CameraView, useCameraPermissions } from 'expo-camera';
import colors from "../constants/Colors";
import { ThemedText } from "../components/ThemedText";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import MicroMenu from '../components/MicroMenu';
import Header from '../components/Header';

type NotificationsPageNavigationProp = StackNavigationProp<RootStackParamList, 'Notifications'>;

interface Props {
    navigation: NotificationsPageNavigationProp;
}

const { width, height } = Dimensions.get('window');
const scannerSize = width * 0.7;

const Notifications: React.FC<Props> = ({ navigation }) => {
    const { t } = useTranslation();
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    if (!permission) {
        return <View style={styles.container} />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.permissionContainer}>
                <Header navigation={navigation} />
                <View style={styles.permissionContent}>
                    <ThemedText type="title" style={styles.permissionTitle}>
                        {t('Cámara')}
                    </ThemedText>
                    <Text style={styles.permissionText}>
                        {t('Necesitamos permiso para usar la cámara y escanear códigos QR.')}
                    </Text>
                    <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
                        <Text style={styles.permissionButtonText}>{t('Dar Permiso')}</Text>
                    </TouchableOpacity>
                </View>
                <MicroMenu navigation={navigation} currentScreen='Notifications' />
            </View>
        );
    }

    const handleBarCodeScanned = ({ type, data }: { type: string, data: string }) => {
        setScanned(true);
        Alert.alert(
            t('Código Escaneado'),
            `${data}`,
            [{ text: 'OK', onPress: () => setScanned(false) }]
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            
            <CameraView
                style={StyleSheet.absoluteFillObject}
                facing="back"
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                }}
            />

            {/* Overlay Oscuro con hueco transparente */}
            <View style={styles.overlay}>
                <View style={styles.overlayTop} />
                <View style={styles.overlayCenter}>
                    <View style={styles.overlaySide} />
                    <View style={styles.scanWindow}>
                        <View style={[styles.corner, styles.cornerTopLeft]} />
                        <View style={[styles.corner, styles.cornerTopRight]} />
                        <View style={[styles.corner, styles.cornerBottomLeft]} />
                        <View style={[styles.corner, styles.cornerBottomRight]} />
                        {!scanned && <View style={styles.scanLine} />}
                    </View>
                    <View style={styles.overlaySide} />
                </View>
                <View style={styles.overlayBottom}>
                    <Text style={styles.instructionText}>
                        {t('Escanea el código QR de la estación')}
                    </Text>
                </View>
            </View>

            {/* Header Flotante con fondo blanco */}
            <View style={styles.headerContainer}>
                <Header navigation={navigation} />
                <View style={styles.titleContainer}>
                    <Text style={styles.screenTitle}>{t('Escanear QR')}</Text>
                </View>
            </View>

            <MicroMenu navigation={navigation} currentScreen='Notifications' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    permissionContainer: {
        flex: 1,
        backgroundColor: colors.blanco,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    permissionContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 100,
    },
    permissionTitle: {
        color: colors.negro,
        marginBottom: 20,
        textAlign: 'center',
    },
    permissionText: {
        fontSize: 16,
        color: colors.gray,
        textAlign: 'center',
        marginBottom: 30,
        paddingHorizontal: 40,
    },
    permissionButton: {
        backgroundColor: colors.azul,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    permissionButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    // Overlay Styles
    overlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
    },
    overlayTop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    overlayCenter: {
        flexDirection: 'row',
        height: scannerSize,
    },
    overlaySide: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    scanWindow: {
        width: scannerSize,
        height: scannerSize,
        backgroundColor: 'transparent',
        position: 'relative',
    },
    overlayBottom: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'center',
        paddingTop: 40,
    },
    // Header Styles
    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.blanco,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingTop: 20, // Para StatusBar
        paddingHorizontal: 20,
        paddingBottom: 15,
        zIndex: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: -10,
    },
    screenTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.azul,
        fontFamily: 'BalooTamma2_700Bold', // Usando la fuente del proyecto si está disponible
    },
    // Scanner Frame Styles
    corner: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderColor: colors.blanco,
        borderWidth: 4,
    },
    cornerTopLeft: {
        top: 0,
        left: 0,
        borderBottomWidth: 0,
        borderRightWidth: 0,
        borderTopLeftRadius: 20,
    },
    cornerTopRight: {
        top: 0,
        right: 0,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderTopRightRadius: 20,
    },
    cornerBottomLeft: {
        bottom: 0,
        left: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderBottomLeftRadius: 20,
    },
    cornerBottomRight: {
        bottom: 0,
        right: 0,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderBottomRightRadius: 20,
    },
    scanLine: {
        position: 'absolute',
        width: '100%',
        height: 2,
        backgroundColor: colors.azul,
        top: '50%',
        opacity: 0.8,
    },
    instructionText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        width: '80%',
        fontFamily: 'BalooTamma2_500Medium',
    },
});

export default Notifications;