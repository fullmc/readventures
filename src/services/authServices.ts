import { api } from "../api/axios";

export const signup = async (email: string, password: string) => {
  const res = await api.post("/auth/signup", { email, password });
  return res.data;
};

export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

export const getMe = async (token: string) => {
  const res = await api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
