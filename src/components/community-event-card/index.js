/* eslint-disable no-constant-binary-expression */
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  FlatList,
} from "react-native";
import { Avatar } from "@rneui/themed";
import { useRouter } from "expo-router";
import PopupMenu from "../popup-menu";
import { MenuProvider } from "react-native-popup-menu";

const CommunityEventCard = ({ event, imageFile, deleteEvent }) => {
  if (!event) return null;
  const router = useRouter();
  const { participants, capacity, imageURI: eventIMG, title, id } = event;

  const Divider = () => <View style={styles.divider} />;

  return (
    <MenuProvider>
      <Pressable
        onPress={() =>
          router.push({
            pathname: `/comunidade/123/evento/${id}`,
            params: {
              event: JSON.stringify(event),
              communityId: "123",
            },
          })
        }
      >
        <ImageBackground
          style={styles.eventContainer}
          source={imageFile ? imageFile : { uri: eventIMG }}
          resizeMode="cover"
          imageStyle={{ filter: "brightness(0.8)" }}
        >
          <PopupMenu leftPosition="45%">
            <Pressable
              onPress={() =>
                router.push({
                  pathname: `/comunidade/123/editar-evento`,
                  params: {
                    event: JSON.stringify(event),
                    communityId: "123",
                  },
                })
              }
            >
              <Text style={styles.optionText}>Editar Evento</Text>
            </Pressable>
            <Divider />
            <Pressable onPress={() => deleteEvent(id)}>
              <Text style={[styles.optionText, { color: "red" }]}>
                Remover Evento
              </Text>
            </Pressable>
          </PopupMenu>
          <Text style={styles.eventName}>{title}</Text>
          <View style={styles.eventMembers}>
            <FlatList
              scrollEnabled={false}
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
              style={[
                styles.eventMembersTxt,
                { right: participants.length * 8 },
              ]}
            >
              {participants?.length}
              <Text style={{ fontWeight: "500" }}>/{capacity}</Text>
            </Text>
          </View>
        </ImageBackground>
      </Pressable>
    </MenuProvider>
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
    borderRadius: 5,
    overflow: "hidden",
    boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.25)",
    position: "relative",
  },
  menu: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  eventName: {
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 14,
    color: "#fff",
    position: "relative",
    bottom: 10,
  },
  eventMembers: {
    position: "absolute",
    bottom: 7,
    left: 11,
    display: "flex",
    flexDirection: "row",
  },
  eventMembersTxt: {
    color: "#fff",
    fontSize: 12,
    marginLeft: 10,
    lineHeight: 18,
  },
  avatarGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  memberAvatar: {
    right: 10,
  },
  menuItem: {
    padding: 10,
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 5,
  },
  optionText: {
    color: "#000",
    fontSize: 13,
  },
});

export default CommunityEventCard;
