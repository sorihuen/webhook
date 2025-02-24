"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PaymentMethod {
  method: string;
  count: number;
  totalAmount: number; // Incluimos totalAmount para reflejar la estructura del backend
}

interface PaymentMethodChartProps {
  methods: PaymentMethod[];
}

export default function PaymentMethodChart({ methods }: PaymentMethodChartProps) {
  const labels = methods.map((item) => item.method);
  const dataValues = methods.map((item) => item.count);

  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: ["#4CAF50", "#FF9800", "#3F51B5", "#F44336"],
      },
    ],
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-gray-700">Payment Methods</h2>
      {methods.length > 0 ? (
        <div className="w-40 mt-4">
          <Pie data={data} />
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No hay datos de métodos de pago disponibles</p>
      )}
    </div>
  );
}