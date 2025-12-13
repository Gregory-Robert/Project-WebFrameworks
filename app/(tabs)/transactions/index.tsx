import { TransactionsContext } from "@/context/TransactionsContext";
import TransactionItem from "@/components/TransactionItem";
import { COLORS } from "@/constants/colors";
import { useContext } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

const Transactions = () => {
  const { totalBalance, transactions, loading, error, refetch } =
    useContext(TransactionsContext);

  const onRefresh = () => {
    refetch();
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6b4e31" />
        <Text style={styles.loadingText}>Transacties laden...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Fout: {error.message}</Text>
        <Button onPress={refetch} title="Opnieuw proberen" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {loading && transactions.length > 0 && (
        <View style={styles.overlay}>
          <ActivityIndicator size="small" color="#6b4e31" />
        </View>
      )}

      <View style={styles.balanceCard}>
        <View style={styles.balanceLeft}>
          <Text style={styles.balanceLabel}>Huidig saldo</Text>
          <Text style={styles.balanceDate}>
            Bijgewerkt op {new Date().toLocaleDateString("nl-BE")}
          </Text>
        </View>

        <Text
          style={[
            styles.balanceAmount,
            { color: totalBalance >= 0 ? COLORS.credit : COLORS.debit },
          ]}
        >
          {totalBalance >= 0 ? "+" : "-"}€{Math.abs(totalBalance).toFixed(2)}
        </Text>
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        refreshing={loading}
        onRefresh={onRefresh}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Geen transacties gevonden</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  overlay: {
    position: "absolute",
    top: 16,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#6b4e31",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: "#999",
  },
  balanceCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: COLORS.card,
    borderBottomWidth: 3,
    borderBottomColor: COLORS.dark,
    elevation: 7,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.14,
    shadowRadius: 10,
  },
  balanceLeft: {
    flex: 1,
  },
  balanceLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: COLORS.dark,
  },
  balanceDate: {
    fontSize: 13,
    color: COLORS.dark,
    opacity: 0.7,
    marginTop: 4,
  },
  balanceAmount: {
    fontSize: 40,
    fontWeight: "bold",
    letterSpacing: -0.5,
  },
});

export default Transactions;
