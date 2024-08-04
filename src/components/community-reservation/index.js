import React, { useState, useEffect } from "react";
import { Button } from "@rneui/themed";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import CommunityReservationController from "../community-reservation-controller";
import eventsCosts from "../../data/event-costs.json";

const CommunityReservation = () => {
  const { expenses } = eventsCosts ?? {};
  const [newEventExpenses, setNewEventExpenses] = useState(expenses);

  const [totalEquipamentCost, setTotalEquipamentCost] = useState(0);
  const [totalTransportCost, setTotalTransportCost] = useState(0);

  const { equipment = [], transport = [] } = newEventExpenses ?? {};

  const [initialQuantities, setInitialQuantities] = useState({});

  useEffect(() => {
    const initialQuantitiesMap = {};
    expenses.equipment.forEach((item) => {
      initialQuantitiesMap[item.id] = item.quantity;
    });
    expenses.transport.forEach((item) => {
      initialQuantitiesMap[item.id] = item.quantity;
    });
    setInitialQuantities(initialQuantitiesMap);
  }, [expenses]);

  const handleIncrease = (id) => {
    setNewEventExpenses((prevExpenses) => {
      const updatedEquipment = prevExpenses.equipment.map((item) => {
        if (item.id === id && item.quantity < item.maxQuantity) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      const updatedTransport = prevExpenses.transport.map((item) => {
        if (item.id === id && item.quantity < item.maxQuantity) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      return {
        ...prevExpenses,
        equipment: updatedEquipment,
        transport: updatedTransport,
      };
    });
  };

  const handleDecrease = (id) => {
    setNewEventExpenses((prevExpenses) => {
      const updatedEquipment = prevExpenses.equipment.map((item) => {
        if (item.id === id && item.quantity > initialQuantities[item.id]) {
          const newQty = item.quantity - 1;
          return { ...item, quantity: newQty };
        }
        return item;
      });
      const updatedTransport = prevExpenses.transport.map((item) => {
        if (item.id === id && item.quantity > initialQuantities[item.id]) {
          const newQty = item.quantity - 1;
          return { ...item, quantity: newQty };
        }
        return item;
      });
      return {
        ...prevExpenses,
        equipment: updatedEquipment,
        transport: updatedTransport,
      };
    });
  };

  const calculateTotalCost = (item) => {
    return item
      .reduce((total, item) => {
        const itemCost = parseFloat(
          item.cost.replace("R$", "").replace(",", ".")
        );
        return total + item.quantity * itemCost;
      }, 0)
      .toFixed(2);
  };

  useEffect(() => {
    setTotalEquipamentCost(calculateTotalCost(equipment));
    setTotalTransportCost(calculateTotalCost(transport));
  }, [newEventExpenses]);

  return (
    <ScrollView contentContainerStyle={styles.reservationContainer}>
      <View style={styles.reservationBox}>
        <View style={styles.reservationBoxTitle}>
          <Text style={styles.reservationBoxTitleTxt}>Vagas no Evento</Text>
        </View>
        <View style={styles.reservationContent}>
          <View style={styles.totalVacancies}>
            <Text style={{ fontSize: 13 }}>Total de Vagas</Text>
            <Text style={{ fontSize: 13 }}>
              8<Text style={{ fontWeight: "500", fontSize: 13 }}>/10</Text>
            </Text>
          </View>
          <Button
            color="#2260A8"
            buttonStyle={{ borderRadius: 10 }}
            containerStyle={{ width: "100%" }}
            titleStyle={{ fontWeight: "600" }}
          >
            Reservar Vaga
          </Button>
        </View>
      </View>
      <View style={styles.reservationBox}>
        <View style={styles.reservationBoxTitle}>
          <Text style={styles.reservationBoxTitleTxt}>Equipamentos</Text>
          <Text style={styles.reservationTotalPrice}>
            R$ {String(totalEquipamentCost).replace(".", ",")}
          </Text>
        </View>
        <View style={[styles.reservationContent, { paddingHorizontal: 0 }]}>
          {equipment.map((item, index) => (
            <CommunityReservationController
              key={item.id}
              name={item.name}
              cost={item.cost}
              quantity={item.quantity}
              maxQuantity={item.maxQuantity}
              isLast={equipment.length === index + 1}
              onIncrease={() => handleIncrease(item.id)}
              onDecrease={() => handleDecrease(item.id)}
            />
          ))}
          <Button
            color="#2260A8"
            buttonStyle={{ borderRadius: 10 }}
            containerStyle={{ width: "100%", paddingHorizontal: 21 }}
            titleStyle={{ fontWeight: "600" }}
          >
            Reservar Equipamentos
          </Button>
        </View>
      </View>
      <View style={styles.reservationBox}>
        <View style={styles.reservationBoxTitle}>
          <Text style={styles.reservationBoxTitleTxt}>Transportes</Text>
          <Text style={styles.reservationTotalPrice}>
            R$ {String(totalTransportCost).replace(".", ",")}
          </Text>
        </View>
        <View style={[styles.reservationContent, { paddingHorizontal: 0 }]}>
          {transport.map((item, index) => (
            <CommunityReservationController
              key={item?.id}
              name={item?.name}
              cost={item?.cost}
              quantity={item?.quantity}
              maxQuantity={item?.maxQuantity}
              itinerary={item?.itinerary}
              isLast={transport.length === index + 1}
              onIncrease={() => handleIncrease(item?.id)}
              onDecrease={() => handleDecrease(item?.id)}
              isTransport={true}
            />
          ))}
          <Button
            color="#2260A8"
            buttonStyle={{ borderRadius: 10 }}
            containerStyle={{ width: "100%", paddingHorizontal: 21 }}
            titleStyle={{ fontWeight: "600" }}
          >
            Reservar Assentos
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  reservationContainer: {
    paddingVertical: 15,
    paddingHorizontal: 22,
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  reservationBox: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#C4C4C454",
  },
  reservationBoxTitle: {
    backgroundColor: "#D9D9D954",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 9,
    paddingHorizontal: 13,
  },
  reservationBoxTitleTxt: {
    fontSize: 15,
    fontWeight: "500",
  },
  reservationContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 21,
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

export default CommunityReservation;
