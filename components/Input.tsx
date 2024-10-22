import { FC, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

export const Input: FC<{
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  rightButton?: React.ReactNode;
}> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  rightButton,
}) => {
  const [focused, setIsFocused] = useState(false);

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };
  return (
    <View style={styles.inputWrap}>
      <TextInput
        value={value}
        style={[styles.input, focused && styles.inputFocused]}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {rightButton && <View style={styles.rightButton}>{rightButton}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    padding: 16,

    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 18.75,
    textAlign: "left",
  },
  inputWrap: {
    width: "100%",
    position: "relative",
  },
  rightButton: {
    position: "absolute",
    right: 16,
    top: "50%",
    transform: [{ translateY: -9 }],
  },
  inputFocused: {
    borderColor: "#FF6C00",
    backgroundColor: "#FFFFFF",
  },
});
