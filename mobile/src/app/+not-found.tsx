import { Link, RelativePathString, Stack } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <ThemedView style={styles.container}>
        <Text className="text-white text-2xl">This screen does not exist.</Text>
        <Link href={"/" as RelativePathString} style={styles.link}>
          <Text className="text-blue-500">Go to home screen!</Text>
        </Link>
        <TouchableOpacity className="px-2 py-1 text-white">
          <Text>random button</Text>
        </TouchableOpacity>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
