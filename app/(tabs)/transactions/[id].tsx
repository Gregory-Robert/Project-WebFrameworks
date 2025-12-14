import { TransactionsContext } from "@/context/TransactionsContext";
import { DARK_COLORS, LIGHT_COLORS } from "@/constants/colors";
import { useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { formatDate } from "@/utils/formatUtils";
import { ThemeContext } from "@/context/ThemeContext";

const TransactionDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useContext(ThemeContext);

  const COLORS = theme === "light" ? LIGHT_COLORS : DARK_COLORS;
  const styles = getStyles(COLORS);

  const { transactions } = useContext(TransactionsContext);
  const transaction = transactions.find(
    (transaction) => transaction.id === Number(id)
  );

  if (!transaction) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Transaction not found</Text>
      </View>
    );
  }

  const isCredit = transaction?.credit !== undefined && transaction.credit! > 0;
  const amount = isCredit ? transaction.credit! : transaction?.debit!;
  const formattedAmount = amount.toFixed(2);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.card,
          isCredit ? styles.creditBorder : styles.debitBorder,
        ]}
      >
        <View style={styles.row}>
          <Text style={styles.label}>Description: </Text>
          <Text style={styles.value}>{transaction?.description}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Category: </Text>
          <Text style={styles.value}>{transaction?.category}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Date: </Text>
          <Text style={styles.value}>
            {formatDate(transaction.transactionDate)}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Amount: </Text>
          <Text
            style={[
              styles.amount,
              { color: isCredit ? LIGHT_COLORS.credit : LIGHT_COLORS.debit },
            ]}
          >
            {isCredit ? "+" : "-"}€{formattedAmount}
          </Text>
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
      marginTop: 10,
      alignSelf: "center",
      width: "90%",
      backgroundColor: COLORS.card,
      borderRadius: 20,
      padding: 24,
      shadowColor: COLORS.dark,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.15,
      shadowRadius: 10,
      elevation: 6,
    },
    creditBorder: {
      borderWidth: 2,
      borderColor: COLORS.credit,
    },
    debitBorder: {
      borderWidth: 2,
      borderColor: COLORS.debit,
    },
    row: {
      flexDirection: "column",
      marginBottom: 12,
      flexWrap: "wrap",
    },
    label: {
      fontSize: 16,
      fontWeight: "400",
      color: COLORS.dark,
    },
    value: {
      fontSize: 20,
      fontWeight: "600",
      color: COLORS.dark,
      flexShrink: 1,
    },
    amount: {
      fontSize: 24,
      fontWeight: "bold",
    },
    notFound: {
      marginTop: 10,
      alignSelf: "center",
      fontSize: 18,
      color: COLORS.debit,
    },
  });

export default TransactionDetail;
