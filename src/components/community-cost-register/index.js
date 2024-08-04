import React, { useState } from "react";
import { Button } from "@rneui/themed";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ToastAndroid,
  Platform,
} from "react-native";
import OrdinaryInput from "../ordinary-input";

const CommunityCostRegister = () => {
  const [equipmentName, setEquipmentName] = useState("");
  const [equipmentQuantity, setEquipmentQuantity] = useState("");
  const [equipmentCost, setEquipmentCost] = useState("");

  const [transportCost, setTransportCost] = useState("");
  const [transportQuantity, setTransportQuantity] = useState("");
  const [transportItinerary, setTransportItinerary] = useState("");

  const handleRegisterEquipment = () => {
    if (
      equipmentName?.length === 0 ||
      equipmentCost?.length === 0 ||
      equipmentQuantity?.length === 0
    )
      return (
        Platform.OS === "android" &&
        ToastAndroid.showWithGravity(
          "Preencha todos os campos obrigatórios",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        )
      );
    const newEquipment = {
      name: equipmentName,
      cost: equipmentCost,
      maxQuantity: parseInt(equipmentQuantity, 10),
    };
    console.log("🚀 ~ handleRegisterEquipment ~ newEquipment:", newEquipment);

    return (
      Platform.OS === "android" &&
      ToastAndroid.showWithGravity(
        "Equipamento Registrado",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      )
    );
  };

  const handleRegisterTransport = () => {
    if (
      transportCost?.length === 0 ||
      transportQuantity?.length === 0 ||
      transportItinerary?.length === 0
    )
      return (
        Platform.OS === "android" &&
        ToastAndroid.showWithGravity(
          "Preencha todos os campos obrigatórios",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        )
      );
    const newTransport = {
      name: "Transporte",
      cost: transportCost,
      maxQuantity: parseInt(transportQuantity, 10),
      itinerary: "",
    };
    console.log("🚀 ~ handleRegisterTransport ~ newTransport:", newTransport);

    return (
      Platform.OS === "android" &&
      ToastAndroid.showWithGravity(
        "Transporte Registrado",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      )
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.costRegisterContainer}>
      <View style={styles.costRegisterBox}>
        <View style={styles.costRegisterBoxTitle}>
          <Text style={styles.costRegisterBoxTitleTxt}>Equipamentos</Text>
        </View>
        <View style={styles.costRegisterContent}>
          <OrdinaryInput
            label="Nome do equipamento *"
            placeholder="Prancha"
            isFilled={false}
            keyboardType="text"
            inputMode="text"
            isMultiLine={false}
            value={equipmentName}
            onChangeText={setEquipmentName}
          />
          <OrdinaryInput
            label="Custo do equipamento *"
            placeholder="0"
            isFilled={true}
            keyboardType="numeric"
            inputMode="numeric"
            isMultiLine={false}
            value={equipmentCost}
            onChangeText={setEquipmentCost}
          />
          <OrdinaryInput
            label="Quantidade disponibilizada *"
            placeholder="0"
            isFilled={true}
            keyboardType="numeric"
            inputMode="numeric"
            isMultiLine={false}
            value={equipmentQuantity}
            onChangeText={setEquipmentQuantity}
          />
          <Button
            color="#2260A8"
            buttonStyle={{ borderRadius: 10 }}
            containerStyle={{ width: "100%" }}
            titleStyle={{ fontSize: 13 }}
            onPress={handleRegisterEquipment}
          >
            Cadastrar Equipamento
          </Button>
        </View>
      </View>
      <View style={styles.costRegisterBox}>
        <View style={styles.costRegisterBoxTitle}>
          <Text style={styles.costRegisterBoxTitleTxt}>Transportes</Text>
        </View>
        <View style={styles.costRegisterContent}>
          <OrdinaryInput
            label="Custo da gasolina *"
            placeholder="0"
            isFilled={true}
            keyboardType="numeric"
            inputMode="numeric"
            isMultiLine={false}
            value={transportCost}
            onChangeText={setTransportCost}
          />
          <OrdinaryInput
            label="Vagas disponibilizadas *"
            placeholder="0"
            isFilled={true}
            keyboardType="numeric"
            inputMode="numeric"
            isMultiLine={false}
            value={transportQuantity}
            onChangeText={setTransportQuantity}
          />
          <OrdinaryInput
            label="Itinerário *"
            placeholder="Escreva aqui seu itinerário..."
            isFilled={true}
            keyboardType="text"
            inputMode="text"
            isMultiLine={true}
            numberOfLines={8}
            value={transportItinerary}
            onChangeText={setTransportItinerary}
          />
          <Button
            color="#2260A8"
            buttonStyle={{ borderRadius: 10 }}
            containerStyle={{ width: "100%" }}
            titleStyle={{ fontSize: 13 }}
            onPress={handleRegisterTransport}
          >
            Cadastrar Veículo
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  costRegisterContainer: {
    paddingVertical: 15,
    paddingHorizontal: 22,
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  costRegisterBox: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#C4C4C454",
  },
  costRegisterBoxTitle: {
    backgroundColor: "#D9D9D954",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 9,
    paddingHorizontal: 13,
  },
  costRegisterBoxTitleTxt: {
    fontSize: 15,
    fontWeight: "500",
  },
  costRegisterContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 16,
    gap: 16,
  },
  totalVacancies: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default CommunityCostRegister;
