import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./screens/Home";
import { PPLResult } from "./screens/PPLResult";
import { PPL } from "./models/PPL";

export type RootStackParamList = {
  Home: undefined;
  PPLResult: {
    ppl: PPL;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Routes() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, statusBarTranslucent: true }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="PPLResult" component={PPLResult} />
    </Stack.Navigator>
  );
}
