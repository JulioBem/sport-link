import React from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Divider, Icon } from "@rneui/themed";
import CommunityEventCard from "../community-event-card";
import events from "../../data/events.json";

const CommunityEvents = () => {
  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.eventsContainer}>
          <View style={styles.eventListParticipating}>
            <Text style={[styles.eventListHeading, { marginTop: 36 }]}>
              participando
            </Text>
            <FlatList
              data={events}
              renderItem={({ item }) => <CommunityEventCard event={item} />}
              keyExtractor={(item) => item.id}
              numColumns={1}
              contentContainerStyle={styles.eventList}
            />
          </View>
          <Divider style={{ marginTop: "16px" }} />
          <View style={styles.eventListGeneral}>
            <Text style={styles.eventListHeading}>outros eventos</Text>
            <FlatList
              data={events}
              renderItem={({ item }) => <CommunityEventCard event={item} />}
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
          bottom: "26px",
          right: "10px",
        }}
        icon={<Icon name="add" size={20} color="#fff" />}
        iconContainerStyle={{ background: "#000" }}
        loadingProps={{ animating: true }}
        onPress={() => alert("click")}
        color="#2260A8"
      />
    </>
  );
};

const styles = StyleSheet.create({
  eventsContainer: {
    margin: "0px auto",
    height: "100%",
  },
  eventListParticipating: {
    margin: "0px auto",
  },
  eventListHeading: {
    fontSize: 12,
    fontWeight: 500,
    marginVertical: 16,
    width: "360px",
    marginHorizontal: "auto",
  },
  eventList: {
    margin: "0px auto",
    display: "flex",
    flexDirection: "column",
    gap: "11px",
  },
});

export default CommunityEvents;
