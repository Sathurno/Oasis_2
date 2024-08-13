import React from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image, FlatList } from "react-native";
import { useTranslation } from 'react-i18next';
import ScrollView from "../components/ScrollView";
import colors from "../constants/Colors";
import { ThemedText } from "../components/ThemedText";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type NotificationsPageNavigationProp = StackNavigationProp<RootStackParamList, 'Notifications'>;

interface Props {
    navigation: NotificationsPageNavigationProp;
}

const notifications = [
    {
        id: '1',
        date: 'Hoy',
        icon: require('../assets/images/carbon_footprint_icon.png'),
        text: 'Huella de carbono reducida en un 30% gracias al uso de Oasis!',
    },
    {
        id: '2',
        date: 'Hoy',
        icon: require('../assets/images/discount_icon.png'),
        text: '15% de descuento en tu próximo uso de Oasis! Reclámalo aquí.',
    },
    {
        id: '3',
        date: 'Ayer',
        icon: require('../assets/images/new_stations_icon.png'),
        text: 'Oasis crece, ahora hay nuevas estaciones Oasis en tu ciudad! Descúbrelas aquí.',
    }
];

const Notifications: React.FC<Props> = ({ navigation }) => {
    const { t } = useTranslation();

    const renderItem = ({ item }: any) => (
        <View style={styles.notificationContainer}>
            <Image source={item.icon} style={styles.notificationIcon} />
            <ThemedText type="subtitle" style={styles.notificationText}>{item.text}</ThemedText>
        </View>
    );

    return (
        <ScrollView>
            <View style={styles.container}>
                {/* Encabezado */}
                <View style={styles.header}>
                    <View style={styles.profileContainer}>
                        <Image source={require('../assets/images/avatar.png')} style={styles.avatar} />
                        <View style={styles.greetingContainer}>
                            <ThemedText type="subtitle" style={styles.greeting}>{t('welcome')}</ThemedText>
                            <ThemedText type="subtitle" style={styles.username}>Ariana Grindel</ThemedText>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <Image source={require('../assets/images/qr_icon.png')} style={styles.qrIcon} />
                    </TouchableOpacity>
                </View>

                {/* Título de Notificaciones */}
                <ThemedText type="title" style={styles.title}>{t('notifications')}</ThemedText>

                {/* Lista de Notificaciones */}
                <FlatList
                    data={notifications}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    ListHeaderComponent={() => (
                        <View>
                            <ThemedText type="subtitle" style={styles.dateText}>{t('today')}</ThemedText>
                        </View>
                    )}
                    ListFooterComponent={() => (
                        <View>
                            <ThemedText type="subtitle" style={styles.dateText}>{t('yesterday')}</ThemedText>
                        </View>
                    )}
                    contentContainerStyle={styles.notificationsList}
                />

                {/* Navegación Inferior */}
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.footerIcon}>
                        <Image source={require('../assets/images/home_icon.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.footerIcon}>
                        <Image source={require('../assets/images/search_icon.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.footerIcon}>
                        <Image source={require('../assets/images/notifications_icon.png')} style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
        backgroundColor: colors.blanco,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    greetingContainer: {
        marginLeft: 10,
    },
    greeting: {
        fontSize: 14,
        color: colors.grayOpaco,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.negro,
    },
    qrIcon: {
        width: 30,
        height: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.negro,
        textAlign: "center",
        marginBottom: 20,
    },
    dateText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.grayOpaco,
        marginTop: 20,
        marginBottom: 10,
    },
    notificationContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    notificationIcon: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    notificationText: {
        flex: 1,
        fontSize: 16,
        color: colors.negro,
    },
    footer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: colors.gray,
        backgroundColor: colors.blanco,
    },
    footerIcon: {
        alignItems: "center",
    },
    icon: {
        width: 30,
        height: 30,
    },
    notificationsList: {
        paddingBottom: 80, // Para evitar que el contenido se esconda detrás del footer
    },
});

export default Notifications;