import { OPENING_BALANCE } from "@/constants/transactionConstants";
import { useFetch } from "@/hooks/useFetch";
import { usePostTransaction } from "@/hooks/usePostTransaction";
import { Transaction } from "@/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface TransactionsContextType {
  initializing: boolean;
  totalBalance: number;
  transactions: Transaction[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const TransactionsContext = createContext<TransactionsContextType>({
  initializing: false,
  totalBalance: 0,
  transactions: [],
  loading: false,
  error: null,
  refetch: () => {},
});

export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [initializing, setInitializing] = useState(true);
  const { loading, data, error, refetch } = useFetch<Transaction[]>(
    "https://sampleapis.assimilate.be/fakebank/accounts"
  );

  const { postTransaction } = usePostTransaction();

  const totalBalance = Number(
    (
      transactions.reduce((sum, t) => {
        return sum + (t.credit || 0) - (t.debit || 0);
      }, 0) ?? 0
    ).toFixed(2)
  );

  useEffect(() => {
    const loadTransactions = async () => {
      setInitializing(true);
      if (!data) return;

      // Sort by id (Newest = highest id first)
      const sortedTransactions = [...data].sort((a, b) => b.id - a.id);

      // //Included the opening balance so the API-derived total cannot result in a negative balance.
      const hasOpeningBalance = sortedTransactions.some(
        (t) => t.description === OPENING_BALANCE.description
      );
      if (!hasOpeningBalance) {
        await postTransaction(OPENING_BALANCE);
        setTimeout(() => {
          refetch();
        }, 1500);
        return;
      }

      setTransactions(sortedTransactions);
      setInitializing(false);
    };
    loadTransactions();
  }, [data]);

  return (
    <TransactionsContext.Provider
      value={{
        initializing,
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
