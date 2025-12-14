import { Drawer } from "expo-router/drawer";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Header from "@/components/Header";
import { UserProvider } from "@/context/UserContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { Provider as PaperProvider } from "react-native-paper";

const RootLayout = () => {
  return (
    <PaperProvider>
      <ThemeProvider>
        <UserProvider>
          <Drawer
            screenOptions={{
              headerShown: false,
              headerTitle: () => null,
              header: () => <Header button="menu" />,
            }}
          >
            <Drawer.Screen
              name="(tabs)"
              options={{
                drawerLabel: "Rekeningen",
                title: "Rekeningen",
                drawerIcon: () => (
                  <FontAwesome6 name="money-check" size={24} color="black" />
                ),
              }}
            />

            <Drawer.Screen
              name="settings"
              options={{
                drawerLabel: "Instellingen",
                title: "Instellingen",
                headerShown: true,
                headerTitleAlign: "center",
                drawerIcon: () => (
                  <Feather name="settings" size={24} color="black" />
                ),
              }}
            />

            <Drawer.Screen
              name="locations"
              options={{
                drawerLabel: "Locaties",
                title: "Locaties",
                headerShown: true,
                headerTitleAlign: "center",
                drawerIcon: () => (
                  <FontAwesome5
                    name="search-location"
                    size={24}
                    color="black"
                  />
                ),
              }}
            />
          </Drawer>
        </UserProvider>
      </ThemeProvider>
    </PaperProvider>
  );
};

export default RootLayout;
