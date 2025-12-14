import { UserContext } from "@/context/UserContext";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { COLORS } from "@/constants/colors";
import { useContext } from "react";

const Settings = () => {
  const { username, setUsername, resetUsername } = useContext(UserContext);

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
    </View>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: "#fff",
  },
  buttonContainer: {
    borderRadius: 12,
    overflow: "hidden",
  },
});

export default Settings;
