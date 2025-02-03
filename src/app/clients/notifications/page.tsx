"use client"

import { useState, useEffect } from "react";
import { NotificationItem } from "@/components/NotificacionItem";
import { Modal } from "@/components/modal/cardModal";
import { SearchComponent } from "@/components/SearchComponent";
import { VerticalLayout } from "@/components/VerticalLayout";
import { fetchNotifications } from "@/app/apiService/apiService";

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
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filterState, setFilterState] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const formatNotificationData = (notif: ApiNotification): Notification => ({
    id: notif.id,
    message: `Transaction ${notif.transactionId}`,
    date: new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "long",
      day: "2-digit"
    }).format(new Date(notif.date)),
    details: `Paid via ${notif.bank} using ${notif.paymentMethod}.`,
    amount: notif.amount,
    status: notif.status,
  });

  // Cargar datos iniciales
  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const url = new URL('http://localhost:5055/api/payments');
      const params = new URLSearchParams();
      params.append('startDate', startDate);
      params.append('endDate', endDate);
      url.search = params.toString();

      const token = localStorage.getItem("token");
      const response = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      
      if (response.ok && result.data) {
        const formattedData = result.data.map(formatNotificationData);
        setNotifications(formattedData);
        setFilteredNotifications(formattedData);
        setError("");
      } else {
        setError(result.message || "Error al cargar notificaciones");
      }
    } catch (err) {
      console.error("Error al cargar:", err);
      setError("Error al cargar notificaciones.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);

    const filtered = notifications.filter(
      (notif) =>
        notif.message.toLowerCase().includes(term.toLowerCase()) ||
        notif.details.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredNotifications(filtered);
  };

  const handleDateChange = async (newStartDate: string, newEndDate: string) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);

    const currentStatus = filterState.toLowerCase();
    const token = localStorage.getItem("token");
    
    try {
      setLoading(true);
      const url = new URL('http://localhost:5055/api/payments');
      
      const params = new URLSearchParams();
      if (currentStatus) params.append('status', currentStatus);
      params.append('startDate', newStartDate);
      params.append('endDate', newEndDate);
      url.search = params.toString();

      const response = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (response.ok && result.data) {
        const formattedData = result.data.map(formatNotificationData);
        setFilteredNotifications(formattedData);
        setNotifications(formattedData); // Actualizar también las notificaciones base
        setError("");
      } else {
        setError(result.message || "Error al filtrar por fechas");
        setFilteredNotifications([]);
      }
    } catch (err) {
      console.error("Error al filtrar por fechas:", err);
      setError("Error al filtrar por fechas");
      setFilteredNotifications([]);
    } finally {
      setLoading(false);
    }
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
      const token = localStorage.getItem("token");
      const url = new URL('http://localhost:5055/api/payments');
      
      const params = new URLSearchParams();
      params.append('status', backendStatus);
      params.append('startDate', startDate);
      params.append('endDate', endDate);
      url.search = params.toString();

      fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((response) => {
          console.log("Datos recibidos:", response);
          if (response.data && Array.isArray(response.data)) {
            const formattedData = response.data.map(formatNotificationData);
            setFilteredNotifications(formattedData);
            setError("");
          } else {
            setError(response.message || "No se encontraron notificaciones");
            setFilteredNotifications([]);
          }
        })
        .catch((err) => {
          console.error("Error al filtrar:", err);
          setError("Error al filtrar notificaciones");
          setFilteredNotifications([]);
        });
    } else {
      setFilteredNotifications(notifications);
      setError("");
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
      <div className="p-6">
        <header className="w-full bg-gradient-to-r from-green-300 to-green-500 shadow-lg py-6 px-6">
          <div className="max-w-4xl w-full mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-800 text-center">
              Payment Notifications
            </h1>
          </div>
        </header>

        <main className="flex-grow w-full mt-6">
          <div className="bg-gray-200 p-6 grid gap-6">
            <div className="col-span-full">
              <SearchComponent 
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                onDateChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
              />
            </div>

            {loading ? (
              <div className="col-span-full text-center">
                <p className="text-gray-600">Cargando notificaciones...</p>
              </div>
            ) : error ? (
              <div className="col-span-full text-center">
                <p className="text-red-600">{error}</p>
              </div>
            ) : filteredNotifications.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
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
              <div className="col-span-full text-center">
                <p className="text-gray-600">No se encontraron notificaciones</p>
              </div>
            )}
          </div>
        </main>

        <Modal isOpen={!!selectedNotification} onClose={closeModal}>
          {selectedNotification && (
            <div className="p-4">
              <h2 className="text-lg sm:text-xl font-bold mb-4">
                {selectedNotification.message}
              </h2>
              <p className="mb-2 text-sm sm:text-base">
                {selectedNotification.details}
              </p>
              {selectedNotification.amount && (
                <p className="mb-2 text-sm sm:text-base">
                  Amount: ${selectedNotification.amount.toFixed(2)}
                </p>
              )}
              {selectedNotification.status && (
                <p className="mb-2 text-sm sm:text-base">
                  Status:{" "}
                  <span
                    className={`font-bold ${
                      selectedNotification.status === "Completed"
                        ? "text-green-600"
                        : selectedNotification.status === "Pending"
                          ? "text-yellow-600"
                          : "text-blue-600"
                    }`}
                  >
                    {selectedNotification.status}
                  </span>
                </p>
              )}
              <p className="text-xs sm:text-sm text-gray-500">
                Date: {selectedNotification.date}
              </p>
            </div>
          )}
        </Modal>
      </div>
    </VerticalLayout>
  );
}