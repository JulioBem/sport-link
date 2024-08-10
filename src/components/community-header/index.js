import React from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  StatusBar,
  Text,
} from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

const CommunityHeader = ({
  imageURI,
  imageFile,
  communityTitle,
  communitySubtitle,
  hasSubtitle = true,
  hideShadow = false,
}) => {
  const router = useRouter();

  return (
    <View
      style={[
        styles.headerContainer,
        hideShadow && {
          boxShadow: "none",
          borderBottomWidth: 1,
          borderBottomColor: "#C4C4C4",
        },
      ]}
    >
      <ImageBackground
        source={imageURI ? { uri: imageURI } : imageFile}
        resizeMode="cover"
        style={styles.headerImage}
        imageStyle={{ filter: "brightness(0.8)", maxWidth: "100%" }}
      >
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <ChevronLeft
              color={!imageURI && !imageFile ? "grey" : "#fff"}
              size={34}
              style={styles.returnBtn}
              onPress={() => router.back()}
            />
            <View>
              <Text
                style={[
                  styles.communityName,
                  !imageURI && !imageFile && { color: "#000 !important" },
                ]}
              >
                {communityTitle}
              </Text>
              {hasSubtitle && (
                <Text style={styles.communitySubtitle}>
                  {communitySubtitle}
                </Text>
              )}
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 156,
    color: "#fff",
    boxShadow: "0 10px 20px rgba(0,0,0,0), 0 4px 4px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
  },
  headerImage: {
    minWidth: "100%",
    height: 156,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "fff",
  },
  communityName: {
    margin: 0,
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    whiteSpace: "nowrap",
    textAlign: "center",
  },
  communitySubtitle: {
    margin: 0,
    color: "#fff",
    fontSize: 15,
    fontWeight: "200",
    whiteSpace: "nowrap",
    textAlign: "center",
  },
  contentContainer: {
    width: "100%",
    paddingBottom: 10,
  },
  titleContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    position: "relative",
    bottom: 25,
  },
  returnBtn: {
    position: "absolute",
    left: 21,
    color: "#fff",
  },
  tabView: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  tabBar: {
    flexDirection: "row",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    borderBottomWidth: 2,
    marginTop: 10,
    fontSize: 12,
    lineHeight: 14,
    paddingBottom: 7,
  },
  scene: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CommunityHeader;
