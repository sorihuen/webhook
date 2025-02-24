"use client";

interface TransactionStatsProps {
  successfulTransactions: number;
}

export default function TransactionStats({ successfulTransactions }: TransactionStatsProps) {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-gray-700">Successful Transactions</h2>
      {successfulTransactions > 0 ? (
        <p className="text-4xl font-bold text-green-500 mt-2">{successfulTransactions}</p>
      ) : (
        <p className="text-xl text-gray-500 mt-2">No hay transacciones exitosas</p>
      )}
    </div>
  );
}