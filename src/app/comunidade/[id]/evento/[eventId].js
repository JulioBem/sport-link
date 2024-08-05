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

export default function Evento(props) {
  const { event, communityId, eventId } = useLocalSearchParams(); // Obtém o parâmetro "event"
  console.log("🚀 ~ Evento ~ event:", event);
  const router = useRouter();
  const {
    // id,
    location,
    title,
    // participants,
    // imageURI,
    // description,
    // date,
    // capacity,
    expenses,
  } = JSON.parse(event);
  console.log("🚀 ~ Evento ~ expenses:", expenses);

  return (
    <SafeAreaView style={styles.container}>
      <CommunityHeader
        communityTitle={title}
        imageURI="https://img.freepik.com/fotos-premium/um-surfista-surfa-uma-onda-em-frente-ao-por-do-sol_201528-74.jpg"
        hasTabs={false}
        hasSubtitle={false}
        {...props}
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.eventMainInfo}>
          <Text style={styles.eventTitle}>{title}</Text>
          <View style={styles.mainInfoGrid}>
            <Icon containerStyle={{ top: 3 }} name="place" size={15} />
            <View>
              <Text style={styles.boldText}>{`${location?.address}`}</Text>
            </View>
          </View>
          <View style={styles.mainInfoGrid}>
            <Icon containerStyle={{ top: 3 }} name="schedule" size={15} />
            <View>
              <Text style={styles.boldText}>Sábado tal tal</Text>
              <Text>6 de Março</Text>
            </View>
          </View>
          <View style={styles.mainInfoGrid}>
            <Avatar
              size={20}
              rounded
              icon={{ name: "group", type: "material" }}
              containerStyle={{ backgroundColor: "#d4d4d4", top: 3 }}
            />
            <Text style={styles.boldText}>
              Júlia, João, Marina e mais 10 estão envolvidos no evento
            </Text>
          </View>
        </View>
        <Divider style={{ marginVertical: 17 }} />
        <View style={styles.eventDetails}>
          <View>
            <Text style={[styles.eventTitle, { marginBottom: 20 }]}>
              Descrição
            </Text>
            <Text style={{ fontSize: 11 }}>
              Venha participar do nosso incrível Encontro de Surfe na
              paradisíaca Praia do Sol! Se você é amante das ondas ou quer
              aprender mais sobre esse esporte radical, este evento é perfeito
              para você. Junte-se a nós para um dia repleto de adrenalina,
              aprendizado e muita diversão. Além de surfar, você terá a
              oportunidade de conhecer novas pessoas, fazer amigos e
              compartilhar essa paixão pelo mar.
            </Text>
          </View>
          <View>
            <Text style={[styles.eventTitle, { marginBottom: 10 }]}>
              Materiais necessários
            </Text>
            <FlatList
              scrollEnabled={false}
              data={[
                { key: "Devin" },
                { key: "Dan" },
                { key: "Dominic" },
                { key: "Jackson" },
              ]}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  <Icon name="done" size={20} color="#000" />
                  <Text>{item.key}</Text>
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
              router.push(
                `/comunidade/${communityId}/evento/${eventId}/organizacao`
              )
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
});