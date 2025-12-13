import { COLORS } from "@/constants/colors";
import { Transaction } from "@/types";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const router = useRouter();

  const isCredit = transaction.credit !== undefined && transaction.credit! > 0;
  const amount = isCredit ? transaction.credit! : transaction.debit!;
  const formattedAmount = amount.toFixed(2);
  const formattedDate = new Date(
    transaction.transactionDate
  ).toLocaleDateString("nl-BE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        router.push({
          pathname: "/transactions/[id]",
          params: { id: transaction.id },
        });
      }}
    >
      <View style={styles.left}>
        <View
          style={[
            styles.iconCircle,
            isCredit ? styles.creditBg : styles.debitBg,
          ]}
        />

        <View style={styles.textContainer}>
          <Text style={styles.description} numberOfLines={1}>
            {transaction.description}
          </Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
      </View>

      <Text
        style={[
          styles.amount,
          { color: isCredit ? COLORS.credit : COLORS.debit },
        ]}
      >
        {isCredit ? "+" : "-"}€{formattedAmount}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
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
  iconCircle: {
    width: 15,
    height: 15,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  creditBg: {
    backgroundColor: COLORS.credit,
  },
  debitBg: {
    backgroundColor: COLORS.debit,
  },
  textContainer: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.dark,
  },
  date: {
    fontSize: 13,
    color: COLORS.dark,
    marginTop: 2,
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default TransactionItem;
