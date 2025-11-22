import React, { useState } from "react";
import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import { useTranslation } from 'react-i18next';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import ScrollView from "../components/ScrollView";
import LogButton from "../components/LogButton";
import colors from "../constants/Colors";
import { ThemedText } from "../components/ThemedText";
import DropDownPicker from 'react-native-dropdown-picker';
import i18next from "../i18n";

type StartPageNavigationProp = StackNavigationProp<RootStackParamList, 'StartPage'>;

interface Props {
  navigation: StartPageNavigationProp;
}

export default function StartPage({ navigation }: Props) {
  const { t, i18n } = useTranslation(); // Accede a i18n
  const [languageOpen, setLanguageOpen] = useState<boolean>(false);
  const [languageValue, setLanguageValue] = useState<string | null>(i18n.language);
  const [languageItems] = useState([
    { label: 'Inglés', value: 'en' },
    { label: 'Español', value: 'es' },
    { label: 'Alemán', value: 'de' }
  ]);

  const handleLanguageChange = (value: string | null) => {
    if (value) {
      i18next.changeLanguage(value); // Cambia el idioma
      setLanguageValue(value); // Actualiza el valor seleccionado
      setLanguageOpen(false); // Cierra el dropdown
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.encabezado}>
        <ThemedText type="subtitle" style={styles.versionText}>Versión 1.0</ThemedText>
        <TouchableOpacity  onPress={() => setLanguageOpen(!languageOpen)}></TouchableOpacity>
          <DropDownPicker
            open={languageOpen}
            value={languageValue}
            items={languageItems}
            setOpen={setLanguageOpen}
            setValue={setLanguageValue}
            onChangeValue={handleLanguageChange}
            style={styles.dropdown}
            textStyle={styles.dropdownText}
            dropDownContainerStyle={styles.dropdownContainer}
            placeholder={t('select_language')} // Placeholder visible when dropdown is closed
            placeholderStyle={styles.placeholder}
            containerStyle={styles.dropdownContainerWrapper}
            
          />
        </View>
        <View style={styles.loge}>
          <ThemedText style={styles.oasis} type="title">{t('welcome')}</ThemedText>
          <Image style={styles.gif} source={require("../assets/earth.gif")} />
        </View>
        <View style={styles.subcontainer}>
          <LogButton 
            title={t('login')} 
            buttonColor={colors.azul} 
            textColor="white" 
            onPress={() => navigation.navigate('Login')}
          />
          <View style={styles.space} />
          <LogButton 
            title={t('register')} 
            buttonColor={colors.blanco} 
            textColor="black" 
            onPress={() => navigation.navigate('Register')}
          />
        </View>
        <LogButton 
          mode="text" 
          title={t('skip')} 
          textColor="#4461F2" 
          onPress={() => navigation.navigate('Home_empty', { tipo: false })}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  gif: {
    width: 360,
    height: 500,
  },
  container: {
    flex: 1,
    marginTop: 55,
    alignItems: "center",
    alignContent: "center",
  },
  encabezado: {
    flexDirection: "row",
    marginBottom: 100,
    alignItems: "center",
  },
  TouchableOpacity: {
    marginTop: 30,
   },
  space: {
    width: 10,
  },
  subcontainer: {
    flexDirection: "row",
    marginTop: 50,
    marginBottom: 20,
  },
  oasis: {
    zIndex: 2,
    marginBottom: -350,
  },
  loge: {
    alignItems: "center",
    alignContent: "center",
    marginTop: 50,
  },
  dropdown: {
    borderWidth: 0, // No border
    backgroundColor: 'transparent', // Transparent background
    marginTop: -15,
  },
  dropdownText: {
    fontFamily: 'BalooTamma2_800ExtraBold',
    color: 'black', // Text color
    textAlign: 'right', // Alinea el texto a la izquierda
    fontSize: 16, 
  },
  dropdownContainerWrapper: {
    width: '100%', // Asegura que el contenedor ocupe el 100% del ancho disponible
    alignItems: 'flex-end', // Alinea el dropdown a la derecha
  },
  dropdownContainer: {
    width: 150,
    backgroundColor: 'transparent', // Transparent background for dropdown list
    borderWidth: 0, // No border for dropdown list
    marginTop: -30,
  },
  placeholder: {
    color: 'black', // Color for placeholder text
  },
  versionText: {
    marginRight: -200, // Space between version text and dropdown
  },
});
