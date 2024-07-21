/* eslint-disable no-constant-binary-expression */
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableHighlight,
  FlatList,
} from "react-native";
import { Avatar } from "@rneui/themed";

const CommunityEventCard = ({ event }) => {
  if (!event) return null;
  const {
    participants,
    capacity,
    currentRegistrations,
    imageURI: eventIMG,
    title,
  } = event;
  console.log("🚀 ~ CommunityEventCard ~ event:", event);
  const backupImage =
    "https://img.freepik.com/fotos-premium/um-surfista-surfa-uma-onda-em-frente-ao-por-do-sol_201528-74.jpg";

  return (
    <TouchableHighlight>
      <ImageBackground
        style={styles.eventContainer}
        source={{ uri: backupImage ?? eventIMG }}
        resizeMode="cover"
        imageStyle={{ filter: "brightness(0.8)" }}
      >
        <Text style={styles.eventName}>{title}</Text>
        <View style={styles.eventMembers}>
          <FlatList
            data={participants}
            renderItem={({ item, index }) => (
              <Avatar
                source={{
                  uri: `${"https://placehold.co/50.png" || item?.profilePicture}`,
                }}
                size={index === 1 ? 20 : 16}
                rounded
                containerStyle={index !== 0 ? { right: index * 10 } : null}
              />
            )}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            style={styles.avatarGroup}
          />
          <Text
            style={[styles.eventMembersTxt, { right: participants.length * 8 }]}
          >
            {currentRegistrations}
            <span style={{ fontWeight: 500 }}>/{capacity}</span>
          </Text>
        </View>
      </ImageBackground>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  eventContainer: {
    width: 360,
    height: 96,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "auto",
    borderRadius: "5px",
    overflow: "hidden",
    boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.25)",
    position: "relative",
  },
  eventName: {
    fontSize: 12,
    fontWeight: 600,
    lineHeight: 14,
    color: "#fff",
  },
  eventMembers: {
    position: "absolute",
    bottom: "7px",
    left: "11px",
    display: "flex",
    flexDirection: "row",
  },
  eventMembersTxt: {
    color: "#fff",
    fontSize: "12px",
    marginLeft: "10px",
    lineHeight: "18px",
  },
  avatarGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  memberAvatar: {
    right: "10px",
  },
});

export default CommunityEventCard;
