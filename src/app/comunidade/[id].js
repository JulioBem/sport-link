import React from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import CommunityHeader from "../../components/community-header";
import CommunityMural from "../../components/community-mural";
import { SceneMap, TabView } from "react-native-tab-view";

const initialLayout = { width: Dimensions.get("window").width };

export default function Comunidade(props) {
  const { id } = useLocalSearchParams();

  const Mural = () => <CommunityMural />;

  const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: "#673ab7" }]}>
      <Text>Eventos Content</Text>
    </View>
  );

  const routes = [
    { key: "first", title: "Mural", component: Mural },
    { key: "second", title: "Eventos", component: SecondRoute },
    // { key: "second", title: "Eventos", component: SecondRoute },
    // Adicione mais rotas conforme necessário
  ];

  const [index, setIndex] = React.useState(0);

  const renderScene = {};
  routes.forEach((route) => {
    renderScene[route.key] = route.component;
  });

  // Use renderScene na SceneMap
  const renderSceneMap = SceneMap(renderScene);

  const renderTabBar = (props) => {
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
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
    <SafeAreaView style={styles.container}>
      <CommunityHeader hasTabs={true} routes={routes} {...props} />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderSceneMap}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={styles.tabView}
      />
      <View style={styles.main}>
        <Text style={styles.title}>Hello World</Text>
        <Text style={styles.subtitle}>This is the first page of your app.</Text>
        <Text>Página de usuário com id {id}</Text>
        <Link href="/">Ir para home</Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    bottom: 38,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    overflow: "hidden",
  },
  tabItem: {
    width: 110,
    alignItems: "center",
    borderBottomWidth: 2,
    marginHorizontal: 37.5, // 75px gap between tabs (37.5px on each side)
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
