import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@rneui/themed";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  ToastAndroid,
  Alert,
} from "react-native";
import CommunityReservationController from "../community-reservation-controller";

// eslint-disable-next-line no-undef
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const CommunityReservation = ({ event }) => {
  const [eventData, setEventData] = useState(event);
  const { expenses, capacity, participants, id } = eventData ?? {};
  const currentUserId = "TESTE123";
  const [newEventExpenses, setNewEventExpenses] = useState(expenses);
  const [totalEquipmentCost, setTotalEquipmentCost] = useState(0);
  const [totalTransportCost, setTotalTransportCost] = useState(0);
  const [changedEquipments, setChangedEquipments] = useState(new Set());
  const { equipment = [], transport = [] } = newEventExpenses ?? {};

  const showToast = (message) => {
    if (Platform.OS === "android") {
      ToastAndroid.showWithGravity(
        message,
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
    }
  };

  const fetchEvent = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/events/id/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });
      const data = await response.json();
      setEventData(data);
      setNewEventExpenses(data.expenses);
    } catch (error) {
      console.error("Erro ao buscar evento:", error);
      showToast("Erro ao atualizar dados do evento.");
    }
  }, [id]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  useEffect(() => {
    const formatCost = (cost) => {
      return parseFloat(cost.replace(/[^0-9,.-]+/g, "").replace(",", "."));
    };

    const calculateTotalCost = (items) => {
      return items
        .reduce((total, item) => {
          const itemCost = formatCost(item.cost);
          return total + (item.participants?.length || 0) * itemCost;
        }, 0)
        .toFixed(2);
    };

    setTotalEquipmentCost(calculateTotalCost(equipment));
    setTotalTransportCost(calculateTotalCost(transport));
  }, [newEventExpenses, equipment, transport]);

  const handleIncrease = useCallback(
    async (id, type) => {
      const participant = {
        id: currentUserId,
        name: "Participante de Teste",
        email: "teste@example.com",
        profilePicture: "https://example.com/profile.jpg",
        status: "confirmed",
      };

      setNewEventExpenses((prevExpenses) => {
        const updatedItems = prevExpenses[type].map((item) => {
          if (
            item.id === id &&
            !item.participants?.some((p) => p.id === currentUserId)
          ) {
            return {
              ...item,
              participants: [...item.participants, participant],
            };
          }
          return item;
        });
        return {
          ...prevExpenses,
          [type]: updatedItems,
        };
      });

      setChangedEquipments((prev) => new Set(prev).add(id));
    },
    [currentUserId]
  );

  const handleDecrease = useCallback(
    (id, type) => {
      setNewEventExpenses((prevExpenses) => {
        const updatedItems = prevExpenses[type].map((item) => {
          if (
            item.id === id &&
            item.participants?.some((p) => p.id === currentUserId)
          ) {
            const oldItem = expenses[type].find(
              (oldItem) => oldItem.id === item.id
            );

            const isInExpenses = oldItem?.participants?.some(
              (p) => p.id === currentUserId
            );

            if (!isInExpenses) {
              return {
                ...item,
                participants: item.participants.filter(
                  (participant) => participant.id !== currentUserId
                ),
              };
            }
          }
          return item;
        });
        return {
          ...prevExpenses,
          [type]: updatedItems,
        };
      });

      setChangedEquipments((prev) => {
        const updated = new Set(prev);
        updated.delete(id);
        return updated;
      });
    },
    [currentUserId, eventData?.expenses]
  );

  const handleReserveAll = useCallback(async () => {
    const participant = {
      id: currentUserId,
      name: "Participante de Teste",
      email: "teste@example.com",
      profilePicture: "https://example.com/profile.jpg",
      status: "confirmed",
    };

    try {
      for (const id of changedEquipments) {
        const type = equipment.find((e) => e.id === id)
          ? "equipment"
          : "transport";

        const response = await fetch(
          `${apiUrl}/events/id/${eventData.id}/reserve/${type}/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ participant }),
          }
        );

        const { ok } = response;
        if (!ok) return showToast("Reserva falhou.");
      }
      showToast("Reserva realizada com sucesso");

      await fetchEvent();
      setChangedEquipments(new Set());
    } catch (error) {
      console.error("Erro ao reservar equipamentos:", error);
      showToast("Erro ao reservar os itens selecionados.");
    }
  }, [changedEquipments, currentUserId, eventData.id, equipment, fetchEvent]);

  const enterEvent = async () => {
    const newMember = {
      id: "TESTE123",
      name: "Participante de Teste",
      email: "teste@example.com",
      profilePicture: "https://example.com/profile.jpg",
      status: "confirmed",
    };

    try {
      const response = await fetch(
        `${apiUrl}/events/id/${id}/add/participant`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify(newMember),
        }
      );

      if (!response.ok) {
        showToast("Erro ao participar");

        throw new Error("Erro ao participar");
      } else {
        await fetchEvent();
        showToast("Participação inserida com sucesso.");
      }
    } catch (error) {
      console.error("Erro ao participar:", error);
      Alert.alert("Erro", "Não foi possível participar.");
    }
  };

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
              {participants?.length}
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
            onPress={() => enterEvent()}
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
          {equipment?.map((item, index) => (
            <CommunityReservationController
              key={item.id}
              name={item.name}
              cost={item.cost}
              quantity={item.participants?.length}
              maxQuantity={item.maxQuantity}
              isLast={equipment?.length === index + 1}
              onIncrease={() => handleIncrease(item.id, "equipment")}
              onDecrease={() => handleDecrease(item.id, "equipment")}
              disabledIncrease={item.participants?.some(
                (p) => p.id === currentUserId
              )}
            />
          ))}
          <Button
            color="#2260A8"
            buttonStyle={{ borderRadius: 10 }}
            containerStyle={{ width: "100%", paddingHorizontal: 21 }}
            titleStyle={{ fontSize: 13 }}
            onPress={handleReserveAll}
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
          {transport?.map((item, index) => (
            <CommunityReservationController
              key={item?.id}
              name={item?.name}
              cost={item?.cost}
              quantity={item?.participants?.length}
              maxQuantity={item?.maxQuantity}
              itinerary={item?.itinerary}
              isLast={transport?.length === index + 1}
              onIncrease={() => handleIncrease(item?.id, "transport")}
              onDecrease={() => handleDecrease(item?.id, "transport")}
              isTransport={true}
              disabledIncrease={item?.participants?.some(
                (p) => p.id === currentUserId
              )}
            />
          ))}
          <Button
            color="#2260A8"
            buttonStyle={{ borderRadius: 10 }}
            containerStyle={{ width: "100%", paddingHorizontal: 21 }}
            titleStyle={{ fontSize: 13 }}
            onPress={handleReserveAll}
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
