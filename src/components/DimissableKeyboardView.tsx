import { ViewProps } from "react-native";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

export const DimissableKeyboardView = ({ children }: { children: React.ReactNode }) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>{children}</TouchableWithoutFeedback>
);
