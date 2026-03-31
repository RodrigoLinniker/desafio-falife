import { makeServer } from "../services/mirage/server";

if (__DEV__) {
  makeServer();
}

import {
  useFonts,
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_700Bold,
} from "@expo-google-fonts/archivo";

import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Loading } from "../components/Loading";
import { Header } from "../components/Header";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_700Bold,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return <Loading />;
  }

  return (
    <SafeAreaView className="flex-1">
      <Header />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(public)" />
      </Stack>
    </SafeAreaView>
  );
}
