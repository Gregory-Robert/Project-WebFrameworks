import Header from "@/components/Header";
import { Stack } from "expo-router";

export default function TransactionsStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: () => null,
        header: () => <Header button="arrow" />,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Transacties",
        }}
      />

      <Stack.Screen
        name="[id]"
        options={{
          title: "Transactie",
        }}
      />
    </Stack>
  );
}
