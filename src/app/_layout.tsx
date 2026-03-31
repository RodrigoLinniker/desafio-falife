import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../styles/global.css";
import RootLayout from "./_index";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

const queryClient = new QueryClient();

export default function Layout() {
  return (
    <GluestackUIProvider config={config}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <RootLayout />
          <Toast />
        </QueryClientProvider>
      </SafeAreaProvider>
    </GluestackUIProvider>
  );
}
