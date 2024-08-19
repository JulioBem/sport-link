import React from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import CommunityHeader from "../../../../components/community-header";
import { Avatar, Button, Divider, Icon } from "@rneui/themed";
import { useLocalSearchParams, useRouter } from "expo-router";
import surfImage from "../../../../../assets/images/surf-image.jpeg";

export default function Evento(props) {
  const { event, communityId, eventId } = useLocalSearchParams();
  const router = useRouter();
  const {
    location,
    title,
    description,
    date,
    participants,
    expenses,
    author,
    materials,
    difficulty,
  } = JSON.parse(event);

  const allParticipants = [author, ...participants];

  const formattedDate = new Date(date).toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <SafeAreaView style={styles.container}>
      <CommunityHeader
        communityTitle={title}
        hasTabs={false}
        hasSubtitle={false}
        imageFile={surfImage}
        {...props}
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.eventMainInfo}>
          <Text style={styles.eventTitle}>{title}</Text>
          <View style={styles.mainInfoGrid}>
            <Icon containerStyle={{ top: 3 }} name="place" size={15} />
            <View>
              <Text style={styles.boldText}>{location.address}</Text>
            </View>
          </View>
          <View style={styles.mainInfoGrid}>
            <Icon containerStyle={{ top: 3 }} name="military-tech" size={15} />
            <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
              <Text style={styles.boldText}>Dificuldade:</Text>
              <Text>{difficulty}</Text>
            </View>
          </View>
          <View style={styles.mainInfoGrid}>
            <Icon containerStyle={{ top: 3 }} name="schedule" size={15} />
            <View>
              <Text style={[styles.boldText, { textTransform: "capitalize" }]}>
                {formattedDate}
              </Text>
            </View>
          </View>
          <View style={styles.mainInfoGrid}>
            <Avatar
              size={20}
              rounded
              icon={{ name: "group", type: "material" }}
              containerStyle={{ backgroundColor: "#d4d4d4", top: 3 }}
            />
            <Pressable
              onPress={() =>
                router.push({
                  pathname: `/comunidade/${communityId}/evento/${eventId}/participantes`,
                  params: { event: event },
                })
              }
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.5 : 1,
                },
                styles.pressableContainer,
              ]}
            >
              {allParticipants?.length > 0 && (
                <Text style={styles.pressableText}>
                  {allParticipants[0]?.name}, {allParticipants[1]?.name}
                  {allParticipants.length - 2 > 0
                    ? ` e mais ${allParticipants.length - 2} estão envolvidos no evento`
                    : "..."}
                </Text>
              )}
            </Pressable>
          </View>
        </View>
        <Divider style={{ marginVertical: 17 }} />
        <View style={styles.eventDetails}>
          <View>
            <Text style={[styles.eventTitle, { marginBottom: 20 }]}>
              Descrição
            </Text>
            <Text style={{ fontSize: 11 }}>{description}</Text>
          </View>
          <View>
            <Text style={[styles.eventTitle, { marginBottom: 10 }]}>
              Materiais necessários
            </Text>
            <FlatList
              scrollEnabled={false}
              data={materials}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  <Icon name="done" size={20} color="#000" />
                  <Text>{item.name}</Text>
                </View>
              )}
            />
          </View>
          <Pressable
            style={styles.eventBtnContainer}
            onPress={() =>
              router.push({
                pathname: `/comunidade/123/evento/${eventId}/pagamentos`,
                params: {
                  currentPage: "Despesas",
                  expenses: JSON.stringify(expenses),
                },
              })
            }
          >
            <Text>
              <Text style={styles.boldText}>Confira as despesas</Text> que você
              tem no evento
            </Text>
          </Pressable>
          <Pressable
            style={styles.eventBtnContainer}
            onPress={() =>
              router.push({
                pathname: `/comunidade/123/evento/${eventId}/pagamentos`,
                params: {
                  currentPage: "Receitas",
                  expenses: JSON.stringify(expenses),
                },
              })
            }
          >
            <Text>
              Veja o valor que você tem{" "}
              <Text style={styles.boldText}>a receber</Text> desse evento
            </Text>
          </Pressable>
          <Button
            color="#2260A8"
            buttonStyle={{ borderRadius: 10 }}
            containerStyle={{ width: "100%" }}
            titleStyle={{ fontSize: 13 }}
            onPress={() =>
              router.push({
                pathname: `/comunidade/${communityId}/evento/${eventId}/organizacao`,
                params: { event: event },
              })
            }
          >
            Atualizar participação
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 23,
    paddingHorizontal: 18,
  },
  eventMainInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 13,
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 18,
  },
  boldText: {
    fontWeight: "600",
  },
  eventDetails: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  listItem: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    marginTop: 2,
  },
  mainInfoGrid: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  eventBtnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f1f1f1",
    height: 75,
    width: "100%",
    borderRadius: 10,
    boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)",
  },
  pressableContainer: {
    flex: 1,
    justifyContent: "center",
  },
  pressableText: {
    color: "#000",
    fontSize: 13,
    fontWeight: "600",
  },
});
