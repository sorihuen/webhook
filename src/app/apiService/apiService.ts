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

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

// Función de dashboard

export const api = {
  // Dashboard endpoints
  getDashboardStats: async () => {
    try {
      const response = await fetch(`${API_URL}/dashboard`, {
        method: 'GET',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  },
}

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

export const apiGetNotifications = async (startDate: string, endDate: string) => {
  try {
    const url = `/checkout/webhook?start_date=${startDate}&end_date=${endDate}`;
    return await apiPostNoAuth(url, {}, true);
  } catch (error) {
    console.error("Error obteniendo notificaciones:", error);
    throw error;
  }
};
