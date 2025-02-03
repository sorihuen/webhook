import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { api } from "@/app/apiService/apiService";

ChartJS.register(ArcElement, Tooltip, Legend);

// Definir el tipo de los métodos de pago
interface PaymentMethod {
  method: string;
  count: number;
}

export default function PaymentMethodChart() {
  const [labels, setLabels] = useState<string[]>([]);
  const [dataValues, setDataValues] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getDashboardStats();
        const paymentMethods: PaymentMethod[] = response.topPaymentMethods || [];

        const methods = paymentMethods.map((item: PaymentMethod) => item.method);
        const counts = paymentMethods.map((item: PaymentMethod) => item.count);

        setLabels(methods);
        setDataValues(counts);
      } catch (err) {
        setError("No se pudo cargar los métodos de pago"); 
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-gray-500">Cargando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const data = {
    labels: labels,
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
      <div className="w-40 mt-4">
        <Pie data={data} />
      </div>
    </div>
  );
}