// app/_layout.tsx
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/Auth/Login"); // 👈 redirect to login if no token
      }
    };
    checkAuth();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />        {/* Home */}
      <Stack.Screen name="auth/Login" />
      <Stack.Screen name="auth/Signup" />
    </Stack>
  );
}
