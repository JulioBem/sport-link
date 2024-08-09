import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, Divider, Icon } from "@rneui/themed";
import CommunityEventCard from "../community-event-card";
import { useLocalSearchParams, useRouter } from "expo-router";
import surfImage from "../../../assets/images/surf-image.jpeg";

const CommunityEvents = () => {
  const { communityId } = useLocalSearchParams();
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:8000/events/all");
        console.log("🚀 ~ fetchEvents ~ response:", response);
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2260A8" />
      </View>
    );
  }

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
                <CommunityEventCard event={item} imageFile={surfImage} />
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
                <CommunityEventCard event={item} imageFile={surfImage} />
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
  },
  eventsContainer: {
    marginHorizontal: "auto",
    height: "100%",
  },
  eventListParticipating: {
    marginHorizontal: "auto",
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
});

export default CommunityEvents;
