"use client";

interface TotalAmountProps {
  total: number;
}

export default function TotalAmount({ total }: TotalAmountProps) {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-gray-700">Total Amount</h2>
      {total > 0 ? (
        <p className="text-4xl font-bold text-blue-500 mt-2">
          ${total.toLocaleString("es-MX", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      ) : (
        <p className="text-xl text-gray-500 mt-2">No hay monto total registrado</p>
      )}
    </div>
  );
}