import { useNavigation, useRouter, useSegments } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { DARK_COLORS, LIGHT_COLORS } from "@/constants/colors";
import { DrawerActions } from "@react-navigation/native";
import { ThemeContext } from "@/context/ThemeContext";
import Feather from "@expo/vector-icons/Feather";
import { useContext } from "react";

interface HeaderProps {
  button: "menu" | "arrow";
}

const Header = ({ button }: HeaderProps) => {
  const { theme } = useContext(ThemeContext);
  const COLORS = theme === "light" ? LIGHT_COLORS : DARK_COLORS;
  const styles = getStyles(COLORS);

  const navigation = useNavigation();
  const router = useRouter();
  const segments = useSegments();

  const handlePress = () => {
    if (button === "menu") {
      navigation.dispatch(DrawerActions.openDrawer());
    } else {
      const lastSegment = segments[segments.length - 1];

      if (lastSegment === "transactions") {
        router.push("/(tabs)");
      } else if (lastSegment === "addTransaction") {
        router.push("/(tabs)/transactions");
      } else {
        router.back();
      }
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handlePress}
        style={styles.button}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 40 }}
      >
        {button === "menu" ? (
          <Feather name="menu" size={28} color="black" />
        ) : (
          <Feather name="arrow-left" size={28} color="black" />
        )}
      </Pressable>
      <Text style={styles.title}>FakeBank</Text>
    </View>
  );
};

type ColorsType = typeof LIGHT_COLORS;
const getStyles = (COLORS: ColorsType) =>
  StyleSheet.create({
    container: {
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-end",
      paddingTop: 35,
      paddingBottom: 12,
      paddingHorizontal: 16,
      backgroundColor: COLORS.primary,
      borderBottomWidth: 5,
      borderBottomColor: COLORS.dark,
    },
    button: {
      marginLeft: 16,
    },
    title: {
      alignSelf: "center",
      position: "absolute",
      fontSize: 28,
      fontWeight: "bold",
      color: COLORS.dark,
    },
  });

export default Header;
