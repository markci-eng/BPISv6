// hooks/useReinstateTransactions.ts
import { useState, useEffect } from "react";

export interface ReinstateTransaction {
  lpaNo: string;
  trxMonth?: string;
  riType?: string;
  orgUnitCode?: string;
  statusId?: string;
  newLPANo?: string;
  newPlanCode?: string;
  dateReceivedByOP?: string;
  dateReceivedFrOP?: string;
  dateInformed?: string;
  dateCompiled?: string;
  daysProcessed?: number;
  notes?: string;
  auditUser?: string;
  auditDate?: string;
  isReported?: number;
  editUser?: string;
  editDate?: string;
}

export const useReinstateTransactions = () => {
  const [transactions, setTransactions] = useState<ReinstateTransaction[]>([]);
  const [loading, setLoading] = useState(false);

  // GET ALL
  const fetchTransactions = async () => {
    setLoading(true);
    const res = await fetch("/api/reinstatements");
    const data = await res.json();
    console.log(data);
    setTransactions(data);
    setLoading(false);
  };

  // CREATE
  const createTransaction = async (payload: ReinstateTransaction) => {
    console.log("payload:", payload);
    await fetch("/api/reinstatements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    fetchTransactions();
  };

  // UPDATE
  const updateTransaction = async (
    lpaNo: string,
    payload: Partial<ReinstateTransaction>,
  ) => {
    await fetch(`/api/reinstatements/${lpaNo}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    fetchTransactions();
  };

  // DELETE
  const deleteTransaction = async (lpaNo: string) => {
    await fetch(`/api/reinstatements/${lpaNo}`, {
      method: "DELETE",
    });
    console.log(lpaNo);
    fetchTransactions();
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return {
    transactions,
    loading,
    fetchTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  };
};
