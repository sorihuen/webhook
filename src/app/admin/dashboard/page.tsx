"use client";

import { VerticalLayout } from "@/components/VerticalLayout";
import TransactionStats from "@/components/admin/dashboardStats";
import TotalAmount from "@/components/admin/dashboardTotal";
import PaymentMethodChart from "@/components/admin/dashboardMethodo";
import PendingTransactions from "@/components/admin/dashboardPending";

export default function DashboardPage() {
  return (
    <VerticalLayout>
      <div className="p-6">
        {/* Header más ancho y con más altura */}
        <header className="w-full bg-gradient-to-r from-green-300 to-green-500 shadow-lg py-6 px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-800 text-center">
              Administration Dashboard
            </h1>
          </div>
        </header>

        {/* Separación entre el header y el contenido */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <TransactionStats />
          <TotalAmount />
          <PaymentMethodChart />
          <PendingTransactions />
        </div>
      </div>
    </VerticalLayout>
  );
}
