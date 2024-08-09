import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@rneui/themed";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import CommunityReservationController from "../community-reservation-controller";

const CommunityReservation = ({ event }) => {
  console.log("🚀 ~ CommunityReservation ~ event:", event);
  const { expenses, capacity, participants } = event ?? {};
  const [newEventExpenses, setNewEventExpenses] = useState(expenses);
  const [totalEquipmentCost, setTotalEquipmentCost] = useState(0);
  const [totalTransportCost, setTotalTransportCost] = useState(0);
  const { equipment = [], transport = [] } = newEventExpenses ?? {};
  const [initialQuantities, setInitialQuantities] = useState({});

  // Calcular initialQuantities apenas quando expenses mudar
  useEffect(() => {
    if (expenses) {
      const initialQuantitiesMap = {};
      expenses.equipment.forEach((item) => {
        initialQuantitiesMap[item.id] = item.participants.length;
      });
      expenses.transport.forEach((item) => {
        initialQuantitiesMap[item.id] = item.participants.length;
      });
      setInitialQuantities(initialQuantitiesMap);
    }
  }, [expenses]);

  // Atualizar newEventExpenses quando expenses mudar
  useEffect(() => {
    if (expenses) {
      setNewEventExpenses({
        equipment: expenses.equipment.map((item) => ({
          ...item,
          quantity: item.participants.length,
        })),
        transport: expenses.transport.map((item) => ({
          ...item,
          quantity: item.participants.length,
        })),
      });
    }
  }, [expenses]);

  // Calcular totalEquipmentCost e totalTransportCost apenas quando newEventExpenses mudar
  useEffect(() => {
    const calculateTotalCost = (items) => {
      return items
        .reduce((total, item) => {
          const itemCost = parseFloat(
            item.cost.replace("R$", "").replace(".", "").replace(",", ".")
          );
          return total + item.quantity * itemCost;
        }, 0)
        .toFixed(2);
    };

    setTotalEquipmentCost(calculateTotalCost(equipment));
    setTotalTransportCost(calculateTotalCost(transport));
  }, [newEventExpenses, equipment, transport]);

  const handleIncrease = useCallback((id) => {
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
  }, []);

  const handleDecrease = useCallback(
    (id) => {
      setNewEventExpenses((prevExpenses) => {
        const updatedEquipment = prevExpenses.equipment.map((item) => {
          if (item.id === id && item.quantity > initialQuantities[item.id]) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });
        const updatedTransport = prevExpenses.transport.map((item) => {
          if (item.id === id && item.quantity > initialQuantities[item.id]) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });
        return {
          ...prevExpenses,
          equipment: updatedEquipment,
          transport: updatedTransport,
        };
      });
    },
    [initialQuantities]
  );

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
              {participants.length}
              <Text style={{ fontWeight: "500", fontSize: 13 }}>
                /{capacity}
              </Text>
            </Text>
          </View>
          <Button
            color="#2260A8"
            buttonStyle={{ borderRadius: 10 }}
            containerStyle={{ width: "100%" }}
            titleStyle={{ fontSize: 13 }}
          >
            Reservar Vaga
          </Button>
        </View>
      </View>
      <View style={styles.reservationBox}>
        <View style={styles.reservationBoxTitle}>
          <Text style={styles.reservationBoxTitleTxt}>Equipamentos</Text>
          <Text style={styles.reservationTotalPrice}>
            R$ {String(totalEquipmentCost).replace(".", ",")}
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
            titleStyle={{ fontSize: 13 }}
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
            titleStyle={{ fontSize: 13 }}
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
