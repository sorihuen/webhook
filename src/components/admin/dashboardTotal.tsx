// src/components/admin/dashboardTotal.tsx
"use client";
import { useState, useEffect } from "react";
import { api } from "@/app/apiService/apiService";


export default function TotalAmount() {
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        setLoading(true);
        const data = await api.getDashboardStats();
        setTotalAmount(data.totalAmount);
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
      <h2 className="text-lg font-semibold text-gray-700">Total Amount</h2>
      
      {loading ? (
        <div className="animate-pulse mt-2">
          <div className="h-10 w-32 bg-gray-200 rounded"></div>
        </div>
      ) : error ? (
        <p className="text-red-500 mt-2">{error}</p>
      ) : (
        <p className="text-4xl font-bold text-blue-500 mt-2">
          $ {totalAmount.toLocaleString('es-MX', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        </p>
      )}
    </div>
  );
}