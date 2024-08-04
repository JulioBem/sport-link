import React from "react";
import { Icon } from "@rneui/themed";
import { StyleSheet, Text, View } from "react-native";

const CommunityReservationController = ({
  isLast = false,
  quantity = 0,
  cost = "R$ 0,00",
  maxQuantity = 10,
  name = "",
  onIncrease,
  onDecrease,
  isTransport = false,
}) => {
  return (
    <View
      style={[styles.controllerContainer, !isLast && { borderBottomWidth: 1 }]}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{ fontWeight: 600, fontSize: 13 }}>{name}</Text>
          <Text style={{ fontSize: 11 }}>
            {cost} {isTransport && "(Custo previsto do rateio)"}
          </Text>
        </View>
        <View style={styles.controller}>
          <Icon
            size={15}
            name="remove-circle-outline"
            type="material"
            onPress={onDecrease}
          />
          <Text>
            {quantity}/{maxQuantity}
          </Text>
          <Icon
            size={15}
            name="add-circle-outline"
            type="material"
            onPress={onIncrease}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  controllerContainer: {
    borderColor: "#C4C4C454",
    width: "100%",
    paddingHorizontal: 21,
    paddingBottom: 13,
  },
  controller: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 11,
  },
});

export default CommunityReservationController;
