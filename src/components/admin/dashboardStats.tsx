"use client";

import { useEffect, useState } from "react";
import { api } from "@/app/apiService/apiService";


export default function TransactionStats() {
  const [successfulTransactions, setSuccessfulTransactions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        setLoading(true);
        const data = await api.getDashboardStats();
        setSuccessfulTransactions(data.successfulTransactions);
        setError(null);
      } catch (error) {
        console.error("Error fetching total amount:", error);
        setError("No se pudo cargar el monto total");
      } finally {
        setLoading(false);
      }
    };

    fetchTotalAmount();
  }, []);

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-gray-700">
      Successful Transactions</h2>
      <p className="text-4xl font-bold text-green-500 mt-2">
        {successfulTransactions ?? 0}
      </p>
    </div>
  );
}