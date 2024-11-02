import { FC } from "react";
import { StyleSheet, TextInput, View } from "react-native";

export const CreatePostInput: FC<{
  placeholder: string;
  leftIcon?: React.ReactNode;
  value: string;
  onChangeText: (text: string) => void;
}> = ({ placeholder, leftIcon, value, onChangeText }) => {
  return (
    <View style={styles.inputWrap}>
      {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrap: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    position: "relative",
  },
  input: {
    width: "100%",
    height: 50,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#BDBDBD",
  },
  leftIcon: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4,
  },
});
