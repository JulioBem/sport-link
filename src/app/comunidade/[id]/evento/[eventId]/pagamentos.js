/* eslint-disable no-constant-binary-expression */
import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, FlatList } from "react-native";
import CommunityHeader from "../../../../../components/community-header";
import { useLocalSearchParams } from "expo-router";
import { Avatar } from "@rneui/themed";

export default function Pagamentos(props) {
  const { expenses, currentPage } = useLocalSearchParams(); // Obtém o parâmetro "event"
  console.log("🚀 ~ Pagamentos ~ expenses:", expenses);

  const [totalAmountOwedToMe, setTotalAmountOwedToMe] = useState(0);
  const [totalAmountIOwe, setTotalAmountIOwe] = useState(0);

  // Função para obter os custos e proprietários dos itens em que o usuário é participante
  const getUserExpenses = (expenses, userId) => {
    const expensesObject = JSON.parse(expenses);
    if (!expensesObject) return;

    const getExpensesForType = (type) => {
      return expensesObject[type]
        ?.filter((expense) =>
          expense.participants.some((participant) => participant.id === userId)
        )
        ?.map((expense) => ({
          cost: expense.cost,
          owner: expense.owner,
        }));
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
      // Verifica se o tipo existe e é um array
      const items = Array.isArray(expensesObject[type])
        ? expensesObject[type]
        : [];

      return items
        .filter((expense) => expense.owner && expense.owner.id === userId)
        .map((expense) => ({
          cost: expense.cost,
          participants: expense.participants,
        }));
    };

    return {
      equipment: getExpensesForType("equipment"),
      transport: getExpensesForType("transport"),
    };
  };

  // Exemplo de uso da função
  const userId = "participant102"; // Substitua pelo ID do usuário desejado
  const userExpenses = getUserExpenses(expenses, userId);
  const ownedExpenses = getOwnedExpenses(expenses, userId);
  console.log("🚀 ~ Pagamentos ~ ownedExpenses:", ownedExpenses);
  console.log("🚀 ~ Pagamentos ~ userExpenses:", userExpenses);

  // Unir as despesas de equipment e transport em uma única lista
  const combinedUserExpenses = [
    ...(userExpenses?.equipment || []),
    ...(userExpenses?.transport || []),
  ];

  const combinedOwnedExpenses = [
    ...(ownedExpenses?.equipment || []),
    ...(ownedExpenses?.transport || []),
  ];
  console.log(
    "🚀 ~ Pagamentos ~ combinedOwnedExpenses:",
    combinedOwnedExpenses
  );

  // Calcular os totais
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
    const totalOwedToMe = combinedOwnedExpenses.reduce((total, expense) => {
      const numericCost = parseFloat(
        expense.cost.replace("R$", "").replace(",", ".")
      );
      return (
        total +
        (isNaN(numericCost) ? 0 : numericCost) * expense.participants.length
      );
    }, 0);

    setTotalAmountIOwe(totalIOwe);
    setTotalAmountOwedToMe(totalOwedToMe);
  }, [combinedUserExpenses, combinedOwnedExpenses]);

  return (
    <SafeAreaView style={styles.container}>
      <CommunityHeader
        communityTitle={`${currentPage} Pendentes`}
        hasSubtitle={false}
        hideShadow={true}
        {...props}
      />
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
            renderItem={({ item }) => (
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
                    uri: `${"https://placehold.co/50.png" || item?.profilePicture}`,
                  }}
                  size={50}
                  rounded
                />
                <View style={styles.listItem}>
                  <Text style={styles.participantName}>{item.owner.name}</Text>
                  <Text style={styles.amountDue}>
                    <Text style={{ fontWeight: "600" }}>Valor: </Text>
                    {item.cost}
                  </Text>
                  <Text style={styles.amountDue}>
                    <Text style={{ fontWeight: "600" }}>Chave Pix: </Text>
                    {item.owner.chavePix}
                  </Text>
                </View>
              </View>
            )}
          />
        )}
        {currentPage === "Receitas" && (
          <FlatList
            data={combinedOwnedExpenses}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
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
                    uri: `${"https://placehold.co/50.png" || item?.profilePicture}`,
                  }}
                  size={50}
                  rounded
                />
                <View style={styles.listItem}>
                  <View>
                    {item.participants.map((participant, index) => (
                      <Text key={index} style={styles.participantName}>
                        {participant.name}
                      </Text>
                    ))}
                  </View>
                  <Text style={styles.amountDue}>
                    <Text style={{ fontWeight: "600" }}>Valor: </Text>
                    {item.cost}
                  </Text>
                </View>
              </View>
            )}
          />
        )}
      </View>
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
