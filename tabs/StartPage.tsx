import React, { Suspense, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, View, Text } from "react-native";
import { Canvas } from "@react-three/fiber/native";
import ScrollView from "../components/ScrollView";
import useControls from "r3f-native-orbitcontrols";
import { Earth } from "../components/Earth2";
import LogButton from "../components/LogButton"; // Ensure the correct path
import colors from "../constants/Colors";
import { ThemedText } from "../components/ThemedText";

export default function StartPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [OrbitControls, events] = useControls();

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.encabezado}>
          <Text>version 1.0</Text>
          <View style={styles.space2}></View>
          <Text>Español</Text>
        </View>
        <View style={styles.loge}>
          <ThemedText style={styles.oasis} type="title">
            OASIS
          </ThemedText>
          <Image style={styles.gif} source={require("../assets/earth.gif")} />
        </View>
        <View style={styles.subcontainer}>
          <LogButton
            title="Iniciar Sesión"
            buttonColor={colors.azul}
            textColor="white"
          />
          <View style={styles.space}></View>
          <LogButton
            title="Registrarse"
            buttonColor={colors.blanco}
            textColor="black"
          />
        </View>
        <LogButton mode="text" title="Skip>>" />
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
  },
  space: {
    width: 10,
  },
  space2: {
    width: 220,
  },
  subcontainer: {
    flexDirection: "row",
    marginTop: 50,
    marginBottom: 20,
  },
  oasis: {
    zIndex: 2,
    marginBottom: -300,
  },
  loge: {
    alignItems: "center",
    alignContent: "center",
    marginTop: 50,
  },
});
