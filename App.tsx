import "react-native-gesture-handler";
import { ThemeProvider, createTheme } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { Routes } from "./src/Routes";

const theme = createTheme();

const App = () => {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <SafeAreaView style={{ flex: 1 }}>
          <Routes />
        </SafeAreaView>
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
