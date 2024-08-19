/* eslint-disable no-constant-binary-expression */
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Pressable,
  Platform,
  ToastAndroid,
} from "react-native";
import CommunityHeader from "../../../../../components/community-header";
import { useLocalSearchParams } from "expo-router";
import { Avatar } from "@rneui/themed";
import PopupMenu from "../../../../../components/popup-menu";
import { MenuProvider } from "react-native-popup-menu";

// eslint-disable-next-line no-undef
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function Pagamentos(props) {
  const {
    expenses: eventExpenses,
    currentPage,
    eventId,
  } = useLocalSearchParams();

  const [expenses, setExpenses] = useState(eventExpenses);
  const [totalAmountOwedToMe, setTotalAmountOwedToMe] = useState(0);
  const [totalAmountIOwe, setTotalAmountIOwe] = useState(0);

  const showToast = (message) => {
    if (Platform.OS === "android") {
      ToastAndroid.showWithGravity(
        message,
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
    }
  };

  const getUserExpenses = (expenses, userId) => {
    const expensesObject = JSON.parse(expenses);
    if (!expensesObject) return;

    const getExpensesForType = (type) => {
      return expensesObject[type]?.filter((expense) =>
        expense.participants.some(
          (participant) =>
            participant.id === userId && participant.status !== "confirmed"
        )
      );
    };

    return {
      equipment: getExpensesForType("equipment"),
      transport: getExpensesForType("transport"),
    };
  };

  const getOwnedExpenses = (expenses, userId) => {
    const expensesObject = JSON.parse(expenses);
    if (!expensesObject) return;

    const getExpensesForType = (type) => {
      const items = Array.isArray(expensesObject[type])
        ? expensesObject[type]
        : [];

      return items.filter(
        (expense) => expense.owner && expense.owner.id === userId
      );
    };

    return {
      equipment: getExpensesForType("equipment"),
      transport: getExpensesForType("transport"),
    };
  };

  const getDebts = (ownedExpenses) => {
    const debts = {};

    const processExpenses = (expenses) => {
      expenses.forEach((expense) => {
        expense.participants.forEach((participant) => {
          if (participant.status === "confirmed") return;

          if (!debts[participant.id]) {
            debts[participant.id] = {
              name: participant.name,
              id: participant.id,
              totalOwed: 0,
              details: [],
            };
          }

          debts[participant.id].totalOwed += parseFloat(
            expense.cost.replace("R$", "").replace(",", ".")
          );
          debts[participant.id].details.push({
            name: expense.name || "Despesa sem nome",
            cost: expense.cost,
            id: expense.id,
            description: "Participante na despesa",
          });
        });
      });
    };

    Object.keys(ownedExpenses).forEach((type) => {
      processExpenses(ownedExpenses[type]);
    });

    return debts;
  };

  const userId = "TESTE123";
  const userExpenses = getUserExpenses(expenses, userId);
  const ownedExpenses = getDebts(getOwnedExpenses(expenses, userId));
  console.log("🚀 ~ Pagamentos ~ ownedExpenses:", ownedExpenses);

  const combinedUserExpenses = [
    ...(userExpenses?.equipment || []),
    ...(userExpenses?.transport || []),
  ];
  console.log("🚀 ~ Pagamentos ~ combinedUserExpenses:", combinedUserExpenses);

  useEffect(() => {
    const calculateTotal = (expensesList) => {
      return expensesList.reduce((total, expense) => {
        const numericCost = parseFloat(
          expense.cost.replace("R$", "").replace(",", ".")
        );
        return total + (isNaN(numericCost) ? 0 : numericCost);
      }, 0);
    };

    const totalIOwe = calculateTotal(combinedUserExpenses);
    const totalOwedToMe = Object.values(ownedExpenses).reduce(
      (total, participantData) => {
        participantData.details.forEach((detail) => {
          const numericCost = parseFloat(
            detail.cost.replace("R$", "").replace(",", ".")
          );
          if (!isNaN(numericCost)) {
            total += numericCost;
          }
        });
        return total;
      },
      0
    );

    setTotalAmountIOwe(totalIOwe);
    setTotalAmountOwedToMe(totalOwedToMe);
  }, [combinedUserExpenses, ownedExpenses]);

  const fetchExpenses = async () => {
    try {
      const response = await fetch(`${apiUrl}/events/id/${eventId}/expenses`, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });
      const data = await response.json();

      setExpenses(JSON.stringify(data));
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    }
  };

  const confirmPayment = async (id, participantId) => {
    const updatedPaymentPayload = {
      participant_id: participantId ?? userId,
      status: "confirmed",
    };

    try {
      const response = await fetch(
        `${apiUrl}/events/id/${eventId}/expenses/${id}/edit`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify(updatedPaymentPayload),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao criar o post");
      } else {
        fetchExpenses();
      }

      showToast(
        "Evento criado com sucesso",
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
    } catch (error) {
      console.error("Erro ao criar o post:", error);
      showToast("Erro", "Não foi possível criar o post.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <MenuProvider>
        <CommunityHeader
          communityTitle={`${currentPage} Pendentes`}
          hasSubtitle={false}
          hideShadow={true}
          {...props}
        />
        <ScrollView>
          <View style={styles.totalExpenses}>
            <Text style={{ fontSize: 16 }}>{`${currentPage}`} totais</Text>
            <Text style={{ fontWeight: 600, fontSize: 24 }}>
              R${" "}
              {currentPage === "Despesas"
                ? totalAmountIOwe.toFixed(2).replace(".", ",")
                : totalAmountOwedToMe.toFixed(2).replace(".", ",")}
            </Text>
          </View>
          <View style={styles.listContainer}>
            {currentPage === "Despesas" && (
              <FlatList
                data={combinedUserExpenses}
                keyExtractor={(item, index) => index.toString()}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <>
                    <PopupMenu
                      leftPosition="95%"
                      entypoColor="black"
                      topPositionTrigger={10}
                      containerMarginBottom={-20}
                    >
                      <Pressable>
                        <Text
                          style={[styles.optionText, { color: "blue" }]}
                          onPress={() => confirmPayment(item?.id)}
                        >
                          Confirmar Pagamento
                        </Text>
                      </Pressable>
                    </PopupMenu>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 25,
                        borderBottomWidth: 1,
                        borderColor: "#d4d4d4",
                        paddingVertical: 10,
                      }}
                    >
                      <Avatar
                        source={{
                          uri: `${item?.profilePicture}`,
                        }}
                        size={50}
                        rounded
                      />
                      <View style={styles.listItem}>
                        <Text
                          style={[
                            styles.participantName,
                            {
                              fontWeight: 600,
                            },
                          ]}
                        >
                          {item.name}
                        </Text>
                        <Text style={styles.participantName}>
                          {item.owner.name}
                        </Text>
                        <Text style={styles.amountDue}>
                          <Text style={{ fontWeight: "600" }}>Valor: </Text>
                          {item?.cost}
                        </Text>
                        <Text style={styles.amountDue}>
                          <Text style={{ fontWeight: "600" }}>Chave Pix: </Text>
                          {item.owner.chavePix}
                        </Text>
                      </View>
                    </View>
                  </>
                )}
              />
            )}
            {currentPage === "Receitas" && (
              <>
                <FlatList
                  data={Object.values(ownedExpenses).flatMap((participant) =>
                    participant.details.map((detail) => ({
                      participantName: participant.name,
                      participantId: participant.id,
                      ...detail,
                    }))
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  scrollEnabled={false}
                  renderItem={({ item }) => (
                    <>
                      <PopupMenu
                        leftPosition="95%"
                        entypoColor="black"
                        topPositionTrigger={10}
                        containerMarginBottom={-20}
                      >
                        <Pressable>
                          <Text
                            style={[styles.optionText, { color: "blue" }]}
                            onPress={() =>
                              confirmPayment(item?.id, item?.participantId)
                            }
                          >
                            Confirmar Pagamento
                          </Text>
                        </Pressable>
                      </PopupMenu>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 25,
                          borderBottomWidth: 1,
                          borderColor: "#d4d4d4",
                          paddingVertical: 10,
                        }}
                      >
                        <Avatar
                          source={{
                            uri: "https://placehold.co/50.png",
                          }}
                          size={50}
                          rounded
                        />
                        <View style={styles.listItem}>
                          <Text
                            style={[
                              styles.participantName,
                              {
                                fontWeight: "600",
                              },
                            ]}
                          >
                            {item.participantName}
                          </Text>
                          <Text style={styles.amountDue}>
                            <Text style={{ fontWeight: "600" }}>
                              {item.name} -{" "}
                            </Text>
                            {item.cost}
                          </Text>
                        </View>
                      </View>
                    </>
                  )}
                />
              </>
            )}
          </View>
        </ScrollView>
      </MenuProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  totalExpenses: {
    padding: 20,
    paddingBottom: 0,
  },
  listContainer: {
    padding: 20,
  },
  listItem: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingVertical: 10,
    width: "100%",
  },
  participantName: {
    fontSize: 16,
  },
  amountDue: {
    fontSize: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
});
