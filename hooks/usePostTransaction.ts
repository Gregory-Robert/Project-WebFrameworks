import { Transaction } from "@/types";
import { useState } from "react";

export const usePostTransaction = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<any>(null);

  const token = process.env.EXPO_PUBLIC_FAKEBANK_TOKEN;

  const postTransaction = async (transactionData: Transaction) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const transaction: any = {
        transactionDate: transactionData.transactionDate,
        description: transactionData.description,
        category: transactionData.category,
        debit: transactionData.debit,
        credit: transactionData.credit,
      };

      const res = await fetch(
        "https://sampleapis.assimilate.be/fakebank/accounts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(transaction),
        }
      );

      const text = await res.text();
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}, message: ${text}`);
      }

      const data = JSON.parse(text);
      setResponse(data);
      setLoading(false);
      return data;
    } catch (err: any) {
      setError(err.message || "Unknown error");
      setLoading(false);
      console.error("Error posting transaction:", err);
    }
  };

  return { postTransaction, loading, error, response };
};
