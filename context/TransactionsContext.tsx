import { OPENING_BALANCE } from "@/constants/transactionConstants";
import { useFetch } from "@/hooks/useFetch";
import { Transaction } from "@/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface TransactionsContextType {
  totalBalance: number;
  transactions: Transaction[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const TransactionsContext = createContext<TransactionsContextType>({
  totalBalance: 0,
  transactions: [],
  loading: false,
  error: null,
  refetch: () => {},
});

export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { loading, data, error, refetch } = useFetch<Transaction[]>(
    "https://sampleapis.assimilate.be/fakebank/accounts"
  );

  const totalBalance = Number(
    (
      transactions.reduce((sum, t) => {
        return sum + (t.credit || 0) - (t.debit || 0);
      }, 0) ?? 0
    ).toFixed(2)
  );

  useEffect(() => {
    const loadTransactions = () => {
      if (!data) return;

      // Sort by date (Newest first)
      const sortedTransactions = [...data].sort(
        (a, b) =>
          new Date(b.transactionDate).getTime() -
          new Date(a.transactionDate).getTime()
      );

      // Included the opening balance so the API-derived total cannot result in a negative balance.
      const hasOpeningBalance = sortedTransactions.some(
        (t) => t.id === OPENING_BALANCE.id
      );
      if (!hasOpeningBalance) {
        setTransactions([...sortedTransactions, OPENING_BALANCE]);
      } else {
        setTransactions(sortedTransactions);
      }
    };
    loadTransactions();
  }, [data]);

  return (
    <TransactionsContext.Provider
      value={{
        totalBalance,
        transactions,
        loading,
        error,
        refetch,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = (): TransactionsContextType => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error("useTransactions must be used within TransactionsProvider");
  }
  return context;
};
