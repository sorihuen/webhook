"use client";

import { useState, useEffect } from "react";
import { VerticalLayout } from "@/components/VerticalLayout";
import TransactionStats from "@/components/admin/dashboardStats";
import TotalAmount from "@/components/admin/dashboardTotal";
import PaymentMethodChart from "@/components/admin/dashboardMethodo";
import PendingTransactions from "@/components/admin/dashboardPending";
import { api } from "@/app/apiService/apiService";
import { useRouter } from "next/navigation";

interface DashboardData {
  successfulTransactions: number;
  totalAmount: number;
  topPaymentMethods: { method: string; count: number; totalAmount: number }[];
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    successfulTransactions: 0,
    totalAmount: 0,
    topPaymentMethods: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("authToken");
        if (!token) {
          router.push("/pageLogin");
          return;
        }

        const data = await api.getDashboardStats();
        setDashboardData(data);
      } catch (err) {
        console.error("Error al cargar datos del dashboard:", err);
        const errorMessage = err instanceof Error ? err.message : "Error desconocido";
        setError(`Error al cargar el dashboard: ${errorMessage}`);
        
        if (err instanceof Error && err.message.includes("401")) {
          localStorage.removeItem("authToken");
          router.push("/pageLogin");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  if (loading) {
    return (
      <VerticalLayout>
        <div className="p-6 text-center">
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </VerticalLayout>
    );
  }

  if (error) {
    return (
      <VerticalLayout>
        <div className="p-6 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </VerticalLayout>
    );
  }

  return (
    <VerticalLayout>
      <div className="p-6">
        <header className="w-full bg-gradient-to-r from-green-300 to-green-500 shadow-lg py-6 px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-800 text-center">
              Administration Dashboard
            </h1>
          </div>
        </header>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <TransactionStats successfulTransactions={dashboardData.successfulTransactions} />
          <TotalAmount total={dashboardData.totalAmount} />
          <PaymentMethodChart methods={dashboardData.topPaymentMethods} />
          <PendingTransactions /> {/* Ajustar si también usa datos */}
        </div>
      </div>
    </VerticalLayout>
  );
}