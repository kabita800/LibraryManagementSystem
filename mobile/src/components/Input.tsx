import React from "react";
import { TextInput, TextInputProps, View, Text } from "react-native";

interface InputProps extends TextInputProps {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ marginBottom: 6, fontSize: 16, fontWeight: "500" }}>
        {label}
      </Text>
      <TextInput
        {...props}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 10,
          fontSize: 16,
        }}
      />
    </View>
  );
};

export default Input;
