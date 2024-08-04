import React from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";

import CommunityHeader from "../../../../../components/community-header";
import CommunityReservation from "../../../../../components/community-reservation";
import CommunityEvents from "../../../../../components/community-events";

const initialLayout = { width: Dimensions.get("window").width };

export default function Evento(props) {
  const Reservation = () => <CommunityReservation />;

  const Events = () => <CommunityEvents />;

  const routes = [
    { key: "first", title: "Reservar", component: Reservation },
    { key: "second", title: "Disponibilizar", component: Events },
  ];

  const [index, setIndex] = React.useState(0);

  const renderScene = {};
  routes.forEach((route) => {
    renderScene[route.key] = route.component;
  });

  const renderSceneMap = SceneMap(renderScene);

  const renderTabBar = (props) => {
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const borderColor = index === i ? "#000" : "transparent";
          const fontWeight = index === i ? "600" : "300";
          return (
            <Pressable
              onPress={() => setIndex(i)}
              style={[styles.tabItem, { borderColor }]}
              key={i}
            >
              <Animated.Text
                style={{
                  color: "#000",
                  fontWeight,
                }}
              >
                {route.title}
              </Animated.Text>
            </Pressable>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <CommunityHeader
        communityTitle="Organização do Evento"
        hasSubtitle={false}
        hideShadow={true}
        {...props}
      />
      <View style={styles.tabContainer}>
        {renderTabBar({ navigationState: { index, routes }, setIndex })}
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderSceneMap}
        renderTabBar={() => <></>}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={styles.tabView}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  tabView: {
    flex: 1,
    width: "100%",
  },
  tabContainer: {
    position: "absolute",
    top: 118,
    width: "100%",
    zIndex: 1,
    backgroundColor: "transparent",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    overflow: "hidden",
    backgroundColor: "transparent",
  },
  tabItem: {
    width: 110,
    alignItems: "center",
    borderBottomWidth: 2,
    marginHorizontal: 37.5,
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
