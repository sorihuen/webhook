// apiService.ts
const API_URL = "http://localhost:5055/api"; 

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al iniciar sesión");
    }

    //  Acceder correctamente al token en data.data.token
    if (data.data && data.data.token) {
      localStorage.setItem("token", data.data.token);
      console.log("Token guardado correctamente:", data.data.token);
    } else {
      throw new Error("No se recibió un token de autenticación.");
    }

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Error de red");
    } else {
      throw new Error("Error desconocido");
    }
  }
};


// Función de registro
export const register = async (username: string, email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Error al registrar el usuario");
      }
  
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message || "Error de red");
      } else {
        throw new Error("Error desconocido");
      }
    }
  };

// Función de dashboard

const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const api = {
  getDashboardStats: async () => {
    try {
      const response = await fetch(`${API_URL}/dashboard`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        if (response.status === 404) {
          // Devolvemos un objeto vacío con la estructura esperada
          return {
            successfulTransactions: 0,
            totalAmount: 0,
            topPaymentMethods: [],
          };
        }
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      return data; // Los datos ya tienen la estructura correcta
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      throw error; // Otros errores se propagan
    }
  },
};

export const apiPostNoAuth = async(url: string, body: object, auth: boolean ) => {
  try{
    const response = await fetch(`${API_URL}${url}`, {
      method: "POST",
      headers: auth ? getAuthHeaders() : {"Content-Type": "application/json",},
      body: JSON.stringify(body)
    });
    if (!response){throw new Error("Error de la respuesta");}
    return response.json()
  }catch
    (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message || "Error de red");
      } else {
        throw new Error("Error desconocido");
      }
  }
};


// Función para obtener notificaciones
export const apiGetNotifications = async (startDate: string, endDate: string) => {
  try {
    const token = localStorage.getItem("authToken");
    const url = `${API_URL}/payments?startDate=${startDate}&endDate=${endDate}`;
    console.log("URL solicitada:", url);
    console.log("Token enviado:", token);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        // En lugar de lanzar un error, devolvemos un array vacío para el 404
        return [];
      }
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${response.statusText} - ${errorText}`);
    }

    const result = await response.json();
    console.log("Respuesta completa del backend:", result);
    return result.data; // Devuelve el array de notificaciones
  } catch (error) {
    console.error("Error obteniendo notificaciones:", error);
    throw error; // Otros errores (401, 500, etc.) se propagan
  }
};