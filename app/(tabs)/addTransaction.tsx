import { DARK_COLORS, LIGHT_COLORS } from "@/constants/colors";
import { ThemeContext } from "@/context/ThemeContext";
import { TransactionsContext } from "@/context/TransactionsContext";
import { usePostTransaction } from "@/hooks/usePostTransaction";
import { formatDate, formatNumberInput } from "@/utils/formatUtils";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import * as Haptics from "expo-haptics";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Snackbar } from "react-native-paper";

const addTransaction = () => {
  const { totalBalance, transactions, refetch } =
    useContext(TransactionsContext);
  const { postTransaction } = usePostTransaction();
  const { theme } = useContext(ThemeContext);

  const COLORS = theme === "light" ? LIGHT_COLORS : DARK_COLORS;
  const styles = getStyles(COLORS);

  const router = useRouter();

  const currentDate = (([y, m, d]) => `${y}-${m}-${d}`)(
    new Date().toISOString().slice(0, 10).split("-")
  );

  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [visible, setVisible] = useState(false);

  const parsedAmount = parseFloat(amount);
  const isDebit = parsedAmount < 0;
  const insufficientFunds = totalBalance - Math.abs(parsedAmount) < 0;

  const handleAdd = async () => {
    setSending(true);

    if (isDebit && insufficientFunds) {
      setErrorMessage("Er staat niet genoeg geld op uw rekening");
      setSending(false);

      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    } else if (description === "" || category === "" || amount === "") {
      setErrorMessage(
        `${
          description === ""
            ? "Beschrijving"
            : category === ""
            ? "Categorie"
            : "Bedrag"
        } ontbreekt`
      );
      setSending(false);

      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    } else {
      const nextId =
        transactions.length === 0
          ? 1
          : Math.max(...transactions.map((t) => t.id)) + 1;

      const newTransaction = {
        transactionDate: currentDate,
        description,
        category,
        debit: isDebit ? Math.abs(parsedAmount) : null,
        credit: !isDebit ? parsedAmount : null,
        id: nextId,
      };

      const result = await postTransaction(newTransaction);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setVisible(true);

      if (result) {
        setDescription("");
        setCategory("");
        setAmount("");

        setTimeout(() => {
          refetch();
          router.replace("/transactions");
          setSending(false);
        }, 2000);
      }
    }
  };

  return (
    <View style={styles.container}>
      {errorMessage && (
        <View style={[styles.messageBox, styles.errorBox]}>
          <Text style={styles.messageText}>{errorMessage}</Text>
        </View>
      )}

      <Text style={styles.title}>Add Transaction</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Date: </Text>
          <Text style={styles.value}>{formatDate(currentDate)}</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Beschrijving"
          placeholderTextColor={COLORS.sub}
          value={description}
          onChangeText={setDescription}
          editable={!sending}
        />
        <TextInput
          style={styles.input}
          placeholder="Categorie"
          placeholderTextColor={COLORS.sub}
          value={category}
          onChangeText={setCategory}
          editable={!sending}
        />
        <TextInput
          style={styles.input}
          placeholder="Bedrag"
          placeholderTextColor={COLORS.sub}
          keyboardType="numeric"
          value={amount}
          onChangeText={(e) => setAmount(formatNumberInput(e))}
          editable={!sending}
        />

        <Pressable
          style={[styles.button, sending && { opacity: 0.5 }]}
          disabled={sending}
          onPress={handleAdd}
        >
          <Text style={styles.buttonText}>
            {sending ? "Verzenden..." : "Ok"}
          </Text>
        </Pressable>
      </View>

      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={5000}
        style={{ backgroundColor: COLORS.succesbg }}
      >
        <Text style={{ color: COLORS.dark }}>Transactie Verzonden!</Text>
      </Snackbar>
    </View>
  );
};

type ColorsType = typeof LIGHT_COLORS;
const getStyles = (COLORS: ColorsType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.light,
      paddingTop: 32,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      textAlign: "center",
      color: COLORS.sub,
      marginBottom: 24,
    },
    card: {
      backgroundColor: COLORS.card,
      padding: 16,
      marginHorizontal: 16,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: COLORS.dark,
      elevation: 5,
      shadowColor: COLORS.dark,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
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
    input: {
      backgroundColor: COLORS.light,
      borderColor: COLORS.dark,
      borderWidth: 1,
      borderRadius: 12,
      padding: 12,
      marginBottom: 12,
      fontSize: 16,
      color: COLORS.dark,
    },
    button: {
      backgroundColor: COLORS.credit,
      padding: 14,
      borderRadius: 12,
      alignItems: "center",
      marginTop: 8,
    },
    buttonText: {
      color: COLORS.light,
      fontWeight: "700",
      fontSize: 16,
    },
    messageBox: {
      margin: 16,
      padding: 12,
      borderRadius: 12,
      marginBottom: 12,
    },
    errorBox: {
      backgroundColor: COLORS.errorbg,
      borderColor: COLORS.debit,
      borderWidth: 1,
    },
    messageText: {
      textAlign: "center",
      color: COLORS.dark,
      fontWeight: "600",
      fontSize: 14,
    },
  });

export default addTransaction;
