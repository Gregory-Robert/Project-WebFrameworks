import { UserContext } from "@/context/UserContext";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Switch,
} from "react-native";
import { LIGHT_COLORS, DARK_COLORS } from "@/constants/colors";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

const Settings = () => {
  const { username, setUsername, resetUsername } = useContext(UserContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const COLORS = theme === "light" ? LIGHT_COLORS : DARK_COLORS;
  const styles = getStyles(COLORS);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.text}>Gebruikersnaam:</Text>
        <TextInput
          style={styles.input}
          value={username}
          placeholder="Vul hier je naam in"
          placeholderTextColor={COLORS.dark + "99"}
          onChangeText={setUsername}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Verwijder"
            color={COLORS.debit}
            onPress={resetUsername}
          />
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.switchRow}>
          <Text style={styles.text}>Dark mode</Text>
          <Switch value={theme === "dark"} onValueChange={toggleTheme} />
        </View>
      </View>
    </View>
  );
};

type ColorsType = typeof LIGHT_COLORS;
const getStyles = (COLORS: ColorsType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.light,
    },
    card: {
      padding: 16,
      margin: 16,
      backgroundColor: COLORS.card,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: COLORS.dark,
      elevation: 5,
      shadowColor: COLORS.dark,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
    },
    text: {
      marginBottom: 8,
      fontSize: 16,
      color: COLORS.dark,
    },
    input: {
      borderWidth: 1,
      borderColor: COLORS.dark,
      borderRadius: 12,
      padding: 12,
      marginBottom: 16,
      fontSize: 16,
      color: COLORS.dark,
      backgroundColor: COLORS.light,
    },
    buttonContainer: {
      borderRadius: 12,
      overflow: "hidden",
    },
    switchRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });

export default Settings;
