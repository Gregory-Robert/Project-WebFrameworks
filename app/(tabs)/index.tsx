import { COLORS } from "@/constants/colors";
import { TransactionsContext } from "@/context/TransactionsContext";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const Home = () => {
  const router = useRouter();
  const { initializing, totalBalance, loading } =
    useContext(TransactionsContext);
  const { username } = useContext(UserContext);

  const isCredit = totalBalance !== undefined && totalBalance >= 0;

  if (initializing || loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {username && <Text style={styles.username}>Welkom {username}</Text>}

      <Pressable
        style={styles.card}
        onPress={() => {
          router.replace("/transactions");
        }}
      >
        <View style={styles.left}>
          <Text style={styles.description}>Zichtrekening</Text>
        </View>

        <Text
          style={[
            styles.amount,
            { color: isCredit ? COLORS.credit : COLORS.debit },
          ]}
        >
          {isCredit ? "+" : "-"}€{Math.abs(totalBalance).toFixed(2)}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
    paddingTop: 32,
  },
  username: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#999999",
    textAlign: "center",
    marginBottom: 24,
  },
  message: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#999999",
    textAlign: "center",
    marginBottom: 24,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.card,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.dark,
    elevation: 5,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.dark,
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Home;
