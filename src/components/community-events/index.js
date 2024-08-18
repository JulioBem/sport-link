import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import { Button, Divider, Icon } from "@rneui/themed";
import CommunityEventCard from "../community-event-card";
import { useLocalSearchParams, useRouter } from "expo-router";
import surfImage from "../../../assets/images/surf-image.jpeg";

// eslint-disable-next-line no-undef
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const CommunityEvents = () => {
  const { communityId } = useLocalSearchParams();
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${apiUrl}/events/all`, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2260A8" />
      </View>
    );
  }

  const showToast = (message) => {
    if (Platform.OS === "android") {
      ToastAndroid.showWithGravity(
        message,
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
    }
  };

  const deleteEvent = async (id) => {
    const response = await fetch(`${apiUrl}/events/id/${id}/remove`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });

    if (response.ok) {
      fetchEvents();
      showToast("Evento deletado com sucesso!");
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.eventsContainer}>
          <View style={styles.eventListParticipating}>
            <Text style={[styles.eventListHeading, { marginTop: 36 }]}>
              Participando
            </Text>
            <FlatList
              scrollEnabled={false}
              data={events}
              renderItem={({ item }) => (
                <CommunityEventCard
                  event={item}
                  imageFile={surfImage}
                  deleteEvent={deleteEvent}
                />
              )}
              keyExtractor={(item) => item.id}
              numColumns={1}
              contentContainerStyle={styles.eventList}
            />
          </View>
          <Divider style={{ marginTop: 16 }} />
          <View style={styles.eventListGeneral}>
            <Text style={styles.eventListHeading}>Outros eventos</Text>
            <FlatList
              scrollEnabled={false}
              data={events}
              renderItem={({ item }) => (
                <CommunityEventCard
                  event={item}
                  imageFile={surfImage}
                  deleteEvent={deleteEvent}
                />
              )}
              keyExtractor={(item) => item.id}
              numColumns={1}
              contentContainerStyle={styles.eventList}
            />
          </View>
        </View>
      </ScrollView>
      <Button
        buttonStyle={{
          width: 42,
          height: 42,
          borderRadius: 100,
          boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.25)",
        }}
        containerStyle={{
          width: 42,
          height: 42,
          position: "absolute",
          bottom: 26,
          right: 10,
        }}
        icon={<Icon name="add" size={20} color="#fff" />}
        iconContainerStyle={{ background: "#000" }}
        loadingProps={{ animating: true }}
        onPress={() => router.push(`/comunidade/${communityId}/criar-evento`)}
        color="#2260A8"
      />
    </>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingBottom: 40,
    height: "100vh",
  },
  eventsContainer: {
    height: "100%",
  },
  eventListHeading: {
    fontSize: 12,
    fontWeight: "500",
    marginVertical: 16,
    width: 360,
    marginHorizontal: "auto",
  },
  eventList: {
    marginHorizontal: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 11,
  },
  loadingContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CommunityEvents;
