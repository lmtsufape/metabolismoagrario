import "react-native-gesture-handler";
import "expo-dev-client";
import { ThemeProvider, createTheme } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { Routes } from "./src/Routes";
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
} from "@tanstack/react-query";
import { useAppState } from "@/hooks/useAppState";
import { AppStateStatus, Platform } from "react-native";
import { useOnlineManager } from "@/hooks/useOnlineManager";
import { lightColors } from "./src/styles/theme";
import { StatusBar } from "expo-status-bar";

const theme = createTheme({
  mode: "light",
  lightColors: lightColors,
});

const queryClient = new QueryClient();

function onAppStateChange(status: AppStateStatus) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

const App = () => {
  useOnlineManager();
  useAppState(onAppStateChange);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <ThemeProvider theme={theme}>
          <StatusBar style="dark" />
          <SafeAreaView style={{ flex: 1 }}>
            <Routes />
          </SafeAreaView>
        </ThemeProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
