import { Icon, Input } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";

const OrdinaryInput = ({
  label,
  placeholder,
  disabled = false,
  isFilled = true,
  keyboardType,
  inputMode,
  isMultiLine = true,
  numberOfLines,
  value,
  onChangeText,
  backgroundColor,
  hasSendIcon,
}) => {
  return (
    <View style={styles.inputBoxContainer}>
      <Input
        placeholder={placeholder}
        inputContainerStyle={[
          styles.inputContainer,
          !isFilled && { backgroundColor: "transparent" },
          backgroundColor && { backgroundColor },
          !isMultiLine && { maxHeight: 45 },
        ]}
        label={label}
        labelStyle={styles.inputLabel}
        disabled={disabled}
        disabledInputStyle={styles.disabledInputStyle}
        inputStyle={styles.inputStyle}
        keyboardType={keyboardType}
        inputMode={inputMode}
        multiline={isMultiLine}
        numberOfLines={numberOfLines}
        value={value}
        onChangeText={onChangeText}
        rightIcon={
          hasSendIcon && (
            <Icon name="send" size={15} reverse color={"#07284F"} />
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputBoxContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  inputContainer: {
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    borderWidth: 0,
    borderColor: "transparent",
    paddingLeft: 15,
    paddingVertical: 5,
  },
  inputLabel: {
    fontSize: 13,
    lineHeight: 15,
    color: "#000",
    marginBottom: 12,
    fontWeight: 500,
  },
  disabledInputStyle: {},
  inputStyle: {
    fontSize: 14,
    outlineStyle: "none",
  },
});

export default OrdinaryInput;
