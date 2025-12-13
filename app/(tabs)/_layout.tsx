import { Tabs } from "expo-router";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Octicons from "@expo/vector-icons/Octicons";
import Header from "@/components/Header";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitle: () => null,
        header: () => <Header button="menu" />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Rekeningen",
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="money-check" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="transactions"
        options={{
          title: "Transacties",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="money-bill-transfer" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="addTransaction"
        options={{
          title: "Nieuwe Transactie",
          headerShown: true,
          headerTitle: () => null,
          header: () => <Header button="arrow" />,
          tabBarIcon: ({ color }) => (
            <Octicons name="diff-added" size={24} color={color} />
          ),
          tabBarStyle: { display: "none" },
        }}
      />
    </Tabs>
  );
}
