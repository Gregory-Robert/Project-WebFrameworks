import { Transaction } from "@/types";

export const OPENING_BALANCE: Transaction = {
  id: 0, // Dummy id, id gets set by API
  transactionDate: "2015-12-30",
  description: "Minimum balance adjustment",
  category: "Transfer",
  debit: null,
  credit: 1000.0,
};