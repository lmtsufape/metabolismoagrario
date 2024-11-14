import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./screens/Home";
import { PPLResult } from "./screens/PPLResult";
import { PPL } from "./models/PPL";
import { useTheme } from "@rneui/themed";

export type RootStackParamList = {
  Home: undefined;
  PPLResult: {
    ppl: PPL;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Routes() {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false, statusBarTranslucent: true }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="PPLResult"
        component={PPLResult}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerShown: true,
          headerTitle: `PPL - ${route.params.ppl.cultivar.name}`,
          headerTitleStyle: { color: theme.colors.grey1, fontWeight: "bold" },
        })}
      />
    </Stack.Navigator>
  );
}
