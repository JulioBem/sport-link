import React from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  StatusBar,
  Pressable,
  Animated,
} from "react-native";
import { Text, VStack, Icon } from "@gluestack-ui/themed";
import { ChevronLeft } from "lucide-react-native";
import { TabView, SceneMap } from "react-native-tab-view";

const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: "#ff4081" }]}>
    <Text>Mural Content</Text>
  </View>
);

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: "#673ab7" }]}>
    <Text>Eventos Content</Text>
  </View>
);

const initialLayout = { width: Dimensions.get("window").width };

const Header = () => {
  const imageURI =
    "https://img.elo7.com.br/product/zoom/16C1755/painel-surf-g-frete-gratis-lona-festa-infantil.jpg";

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Mural" },
    { key: "second", title: "Eventos" },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          //   const opacity = props.position.interpolate({
          //     inputRange,
          //     outputRange: inputRange.map((inputIndex) =>
          //       inputIndex === i ? 1 : 0.5
          //     ),
          //   });
          //   const color = index === i ? "#fff" : "#aaa";
          const borderColor = index === i ? "#fff" : "transparent";
          const fontWeight = index === i ? "600" : "300";
          return (
            <Pressable
              onPress={() => setIndex(i)}
              style={[styles.tabItem, { borderColor }]}
              key={i}
            >
              <Animated.Text
                style={{
                  //   color,
                  // opacity,
                  color: "#fff",
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
    <View style={styles.headerContainer}>
      <ImageBackground
        source={{ uri: imageURI }}
        resizeMode="stretch"
        style={styles.headerImage}
      >
        <VStack style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Icon
              as={ChevronLeft}
              color="#fff"
              size="34px"
              style={styles.returnBtn}
            />
            <VStack>
              <Text style={styles.communityName}>Comunidade de Surfe</Text>
              <Text style={styles.communitySubtitle}>
                Grupo de surfistas da UFPE
              </Text>
            </VStack>
          </View>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            style={styles.tabView}
          />
        </VStack>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 156,
    color: "#fff",
  },
  headerImage: {
    minWidth: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#000",
  },
  communityName: {
    margin: 0,
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    whiteSpace: "nowrap",
  },
  communitySubtitle: {
    margin: 0,
    color: "#fff",
    fontSize: 15,
    fontWeight: "200",
    whiteSpace: "nowrap",
  },
  contentContainer: {
    width: "100%",
  },
  titleContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  returnBtn: {
    position: "absolute",
    left: 21,
    color: "#fff",
  },
  tabView: {
    marginTop: StatusBar.currentHeight,
  },
  tabBar: {
    flexDirection: "row",
    // backgroundColor: "rgba(0,0,0,0.7)",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    // padding: 16,
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

export default Header;
