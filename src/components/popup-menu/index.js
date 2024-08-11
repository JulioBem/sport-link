import React from "react";
import { Menu, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import { Entypo } from "@expo/vector-icons";

const PopupMenu = ({ leftPosition, children }) => {
  return (
    <Menu style={{ position: "relative", left: leftPosition }}>
      <MenuTrigger
        customStyles={{
          triggerWrapper: {
            top: -20,
          },
        }}
      >
        <Entypo name="dots-three-vertical" size={16} color="white" />
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: {
            borderRadius: 4,
            padding: 8,
            backgroundColor: "#f1f1f1",
            elevation: 3,
          },
          optionWrapper: {
            padding: 10,
          },
          optionText: {
            color: "#000",
            fontSize: 16,
          },
        }}
      >
        {children}
      </MenuOptions>
    </Menu>
  );
};

export default PopupMenu;
