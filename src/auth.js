import { API_BASE_URL } from './cfg';

export const login = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    credentials: "include", // ⬅️ ОБЯЗАТЕЛЬНО!
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credentials)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Login failed");
  }

  return await response.json();
};

export const getMe = async () => {
  const res = await fetch(`${API_BASE_URL}/user/me`, {
    method: "GET",
    credentials: "include", // 🔑 чтобы куки работали!
  });

  if (!res.ok) {
    throw new Error("Пользователь не авторизован");
  }

  return await res.json();
};
