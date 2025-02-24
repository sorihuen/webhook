"use client";

import { useState, useEffect } from "react";
import { NotificationItem } from "@/components/NotificacionItem";
import { Modal } from "@/components/modal/cardModal";
import { SearchComponent } from "@/components/SearchComponent";
import { VerticalLayout } from "@/components/VerticalLayout";
import { apiGetNotifications } from "@/app/apiService/apiService";
import { useRouter } from "next/navigation";

interface ApiNotification {
  id: number;
  transactionId: string;
  date: string;
  bank: string;
  paymentMethod: string;
  amount: number;
  status: string;
}

interface Notification {
  id: number;
  message: string;
  date: string;
  details: string;
  amount: number;
  status: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([]);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0] // Últimos 7 días
  );
  const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]); // Hoy
  const [searchTerm, setSearchTerm] = useState("");
  const [filterState, setFilterState] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // Para errores críticos
  const router = useRouter();

  const formatNotificationData = (notif: ApiNotification): Notification => ({
    id: notif.id,
    message: `Transaction ${notif.transactionId}`,
    date: new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }).format(new Date(notif.date)),
    details: `Paid via ${notif.bank} using ${notif.paymentMethod}.`,
    amount: notif.amount,
    status: notif.status,
  });

  const loadNotifications = async () => {
    try {
      setLoading(true);
      setError(""); // Limpiar errores previos

      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push("/pageLogin");
        return;
      }

      const data = await apiGetNotifications(startDate, endDate);
      console.log("Notificaciones recibidas:", data);

      if (!Array.isArray(data)) {
        throw new Error("La respuesta de la API no es un array válido");
      }

      const formattedData = data.map(formatNotificationData);
      setNotifications(formattedData);
      setFilteredNotifications(formattedData);
    } catch (err) {
      console.error("Error al cargar notificaciones:", err);
      const errorMessage = err instanceof Error ? err.message : "Error desconocido";
      setError(`Error al cargar las notificaciones: ${errorMessage}`);
      setFilteredNotifications([]);
      
      if (err instanceof Error && err.message.includes("401")) {
        localStorage.removeItem("authToken");
        router.push("/pageLogin");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, [startDate, endDate]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = notifications.filter(
      (notif) =>
        notif.message.toLowerCase().includes(term.toLowerCase()) ||
        notif.details.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredNotifications(filtered);
  };

  const handleDateChange = (newStartDate: string, newEndDate: string) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  const handleFilterChange = (filter: string) => {
    let backendStatus = "";
    console.log(`Estado seleccionado: ${filter}`);

    switch (filter) {
      case "Pending":
        backendStatus = "pending";
        break;
      case "Success":
        backendStatus = "success";
        break;
      case "Reversed":
        backendStatus = "reversed";
        break;
      case "Failed":
        backendStatus = "failed";
        break;
      default:
        backendStatus = "";
    }

    setFilterState(backendStatus);

    if (backendStatus) {
      const filtered = notifications.filter(
        (notif) => notif.status.toLowerCase() === backendStatus
      );
      setFilteredNotifications(filtered);
    } else {
      setFilteredNotifications(notifications);
    }
  };

  const handleNotificationClick = (id: number) => {
    const notification = filteredNotifications.find((n) => n.id === id);
    setSelectedNotification(notification || null);
  };

  const closeModal = () => {
    setSelectedNotification(null);
  };

  return (
    <VerticalLayout>
      <div className="px-4 md:px-6 py-4 md:py-6 max-w-full">
        <header className="w-full bg-gradient-to-r from-green-300 to-green-500 shadow-lg py-4 md:py-6 px-4 md:px-6">
          <div className="max-w-full w-full mx-auto">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-800 text-center">
              Payment Notifications
            </h1>
          </div>
        </header>

        <main className="w-full mt-4 md:mt-6">
          <div className="bg-gray-200 p-4 md:p-6">
            <div className="mb-4 md:mb-6">
              <SearchComponent
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                onDateChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
              />
            </div>

            {loading ? (
              <div className="text-center">
                <p className="text-gray-600">Cargando notificaciones...</p>
              </div>
            ) : error ? (
              <div className="text-center">
                <p className="text-red-600">{error}</p> {/* Solo errores críticos */}
              </div>
            ) : filteredNotifications.length > 0 ? (
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                {filteredNotifications.map((notif) => (
                  <NotificationItem
                    key={notif.id}
                    id={notif.id}
                    message={notif.message}
                    date={notif.date}
                    status={notif.status}
                    onClick={() => handleNotificationClick(notif.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-600">
                  No se encontraron notificaciones para el rango de fechas seleccionado
                </p>
              </div>
            )}
          </div>
        </main>

        <Modal isOpen={!!selectedNotification} onClose={closeModal}>
          {selectedNotification && (
            <div className="p-4 md:p-6 max-w-full">
              <h2 className="text-lg md:text-xl font-bold mb-4">{selectedNotification.message}</h2>
              <p className="mb-2 text-sm md:text-base">{selectedNotification.details}</p>
              {selectedNotification.amount && (
                <p className="mb-2 text-sm md:text-base">
                  Amount: ${selectedNotification.amount.toFixed(2)}
                </p>
              )}
              {selectedNotification.status && (
                <p className="mb-2 text-sm md:text-base">
                  Status:{" "}
                  <span
                    className={`font-bold ${
                      selectedNotification.status.toLowerCase() === "success"
                        ? "text-green-600"
                        : selectedNotification.status.toLowerCase() === "pending"
                        ? "text-yellow-600"
                        : "text-blue-600"
                    }`}
                  >
                    {selectedNotification.status}
                  </span>
                </p>
              )}
              <p className="text-xs md:text-sm text-gray-500">Date: {selectedNotification.date}</p>
            </div>
          )}
        </Modal>
      </div>
    </VerticalLayout>
  );
}