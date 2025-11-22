import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import { useTranslation } from 'react-i18next';
import ScrollView from "../components/ScrollView";
import LogButton from "../components/LogButton";
import colors from "../constants/Colors";
import { ThemedText } from "../components/ThemedText";
import DropDownPicker from 'react-native-dropdown-picker';
import i18next from "../i18n";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; // Asegúrate de que el archivo de tipos esté correctamente importado

type LoginPageNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginPageNavigationProp;
}

const Login: React.FC<Props> = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [languageOpen, setLanguageOpen] = useState<boolean>(false);
  const [languageValue, setLanguageValue] = useState<string | null>(i18n.language);
  const [languageItems] = useState([
    { label: 'Inglés', value: 'en' },
    { label: 'Español', value: 'es' },
    { label: 'Alemán', value: 'de' }
  ]);

  const handleLanguageChange = (value: string | null) => {
    if (value) {
      i18next.changeLanguage(value);
      setLanguageValue(value);
      setLanguageOpen(false);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.encabezado}>
          <TouchableOpacity onPress={() => setLanguageOpen(!languageOpen)}>
            <ThemedText type="subtitle">{t('')}</ThemedText>
          </TouchableOpacity>
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
            placeholder={t('select_language')}
            placeholderStyle={styles.placeholder}
            containerStyle={styles.dropdownContainerWrapper}
          />
        </View>
        <ThemedText type="subtitle" style={styles.title}>{t('Hello Again!')}</ThemedText>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={t('enter_email')}
            placeholderTextColor={colors.gray}
            style={[styles.input, styles.textInput]} // Añadido estilo de texto
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={t('enter_password')}
            placeholderTextColor={colors.gray}
            style={[styles.input, styles.textInput]} // Añadido estilo de texto
            secureTextEntry
          />
        </View>
        <View style={styles.forgotPasswordContainer}>
          <TouchableOpacity>
            <ThemedText type="subtitle" style={styles.forgotPassword}>{t('forgot_password')}</ThemedText>
          </TouchableOpacity>
        </View>
        <View style={{ width: '100%', marginBottom: 20 }}>
          <LogButton
            title={t('sign_in')}
            buttonColor={colors.azul}
            textColor="white"
            sizeText={17}
            style={{ width: "100%" }} // Hace que el botón ocupe todo el ancho del contenedor
            onPress={() => navigation.navigate('Home')}
          />
        </View>
        <ThemedText type="subtitle" style={styles.or}>{t('or_continue_with')}</ThemedText>
        <View style={styles.socialContainer}>
          <LogButton
            icon={require('../assets/images/Ícono_google.png')}
            buttonColor="white"
            style={styles.socialButton}
          />
          <LogButton
            icon={require('../assets/images/Icono_apple.png')}
            buttonColor="white"
            style={styles.socialButton}
          />
          <LogButton
            icon={require('../assets/images/Ícono_facebook.png')}
            buttonColor="white"
            style={styles.socialButton}
          />
        </View>
        <TouchableOpacity style={styles.container2} onPress={() => navigation.navigate('Register')}>
          <ThemedText style={styles.register} type="subtitle" sizeText={18}>
            {t('no_account')} <ThemedText type="subtitle" sizeText={18} style={styles.registerLink}>{t('register_here')}</ThemedText>
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  encabezado: {
    flexDirection: "row",
    marginBottom: 40, // Ajustar según sea necesario
    justifyContent: "flex-end",
    width: "100%",
  },
  title: {
    marginBottom: 30,
    fontSize: 24,
  },
  icons: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: colors.blanco,
    borderColor: '#FFFFFF',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: "100%",
    height: 50,
    // Sombra en iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // Sombra en Android
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 10,
  },
  textInput: {
    fontFamily: 'BalooTamma2_800ExtraBold', // Usa el estilo de "subtitle"
  },
  dropdown: {
    borderWidth: 0,
    backgroundColor: 'transparent',
    marginTop: -15,
  },
  dropdownText: {
    fontFamily: 'BalooTamma2_800ExtraBold',
    color: 'black',
    textAlign: 'right',
  },
  dropdownContainerWrapper: {
    width: '100%',
    alignItems: 'flex-end',
  },
  dropdownContainer: {
    width: 150,
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginTop: -30,
  },
  placeholder: {
    color: 'black',
  },
  forgotPasswordContainer: {
    width: "100%", // Toma todo el ancho
    alignItems: "flex-end", // Alinéalo a la derecha
  },
  forgotPassword: {
    color: colors.grayOpaco,
    fontSize: 13,
    marginBottom: 30,
  },
  or: {
    marginVertical: 20,
    color: colors.grayOpaco,
    fontSize: 13,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center", // Centra los botones en el contenedor
    width: "100%",
    marginBottom: 20,

  },
  register: {
    marginTop: 30,
    textAlign: 'center', // Centra el texto dentro de ThemedText
    textAlignVertical: 'center', // Centra verticalmente el texto (para algunas plataformas)
  },
  registerLink: {
    color: colors.azul,
  },
  socialButton: {
    marginHorizontal: 10, // Ajusta este valor para controlar el espacio entre los botones
  },
  container2: {
    width: 200, // Ajusta el ancho según sea necesario
    alignItems: 'center', // Centra el contenido horizontalmente
  },
});

export default Login;