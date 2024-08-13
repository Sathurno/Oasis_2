import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import ScrollView from '../components/ScrollView'; // Asegúrate de que esto apunte al lugar correcto
import colors from '../constants/Colors'; // Asegúrate de que esto apunte al lugar correcto
import Icon from 'react-native-vector-icons/Ionicons'; // Si usas vector-icons para los iconos de flechas

const BatteryScreen = () => {
  const { t } = useTranslation();

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Encabezado con usuario y avatar */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image 
              source={{ uri: 'https://example.com/user-avatar.png' }} // Reemplaza con la ruta de tu avatar
              style={styles.avatar} 
            />
            <View>
              <Text style={styles.welcomeText}>{t('Bienvenida')}</Text>
              <Text style={styles.userName}>Ariana Grinder</Text>
            </View>
          </View>
          <Icon name="qr-code-outline" size={30} color={colors.negro} />
        </View>

        {/* Título de la pantalla */}
        <Text style={styles.title}>{t('Baterías Portátiles')}</Text>

        {/* Información de la batería */}
        <View style={styles.batteryInfoContainer}>
          <Text style={styles.batteryInfoText}>{t('Total restante')}: 60%</Text>
          <Text style={styles.batteryInfoText}>{t('Coste acumulado')}: 5,45€</Text>
          <Text style={styles.batteryInfoText}>{t('Inicio')}: 10/05/2024   15h30</Text>
        </View>

        {/* Imagen de la batería */}
        <View style={styles.batteryImageContainer}>
          <Icon name="chevron-back-outline" size={30} color={colors.negro} />
          <Image 
            source={{ uri: 'https://example.com/battery-image.png' }} // Reemplaza con la ruta de la imagen de la batería
            style={styles.batteryImage} 
          />
          <Icon name="chevron-forward-outline" size={30} color={colors.negro} />
        </View>

        {/* Información de la batería seleccionada */}
        <Text style={styles.batteryName}>Batería 1JKL5</Text>

        {/* Botón de devolver */}
        <TouchableOpacity style={styles.returnButton}>
          <Text style={styles.returnButtonText}>{t('Devolver')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: colors.blanco,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  welcomeText: {
    fontSize: 14,
    color: colors.gray,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.negro,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.negro,
    textAlign: 'center',
    marginBottom: 30,
  },
  batteryInfoContainer: {
    marginBottom: 20,
  },
  batteryInfoText: {
    fontSize: 16,
    color: colors.negro,
    marginBottom: 5,
  },
  batteryImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  batteryImage: {
    width: 100,
    height: 150,
  },
  batteryName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  returnButton: {
    backgroundColor: colors.azul,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignSelf: 'center',
  },
  returnButtonText: {
    color: colors.blanco,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BatteryScreen;