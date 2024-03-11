import { Home } from "@/screens/home";
import { ThemeProvider, createTheme, useTheme } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={{ flex: 1 }}>
        <Home />
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default App;
