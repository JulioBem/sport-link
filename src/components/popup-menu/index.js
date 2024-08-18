import React from "react";
import { Menu, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import { Entypo } from "@expo/vector-icons";

const PopupMenu = ({
  leftPosition,
  children,
  entypoColor = "white",
  topPositionTrigger = -20,
  containerMarginBottom = 0,
}) => {
  return (
    <Menu
      style={{
        position: "relative",
        left: leftPosition,
        marginBottom: containerMarginBottom,
        zIndex: 2,
      }}
    >
      <MenuTrigger
        customStyles={{
          triggerWrapper: {
            top: topPositionTrigger,
          },
        }}
      >
        <Entypo name="dots-three-vertical" size={16} color={entypoColor} />
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: {
            borderRadius: 4,
            padding: 8,
            backgroundColor: "#f1f1f1",
            elevation: 3,
            marginTop: topPositionTrigger + 20,
          },
        }}
      >
        {children}
      </MenuOptions>
    </Menu>
  );
};

export default PopupMenu;
