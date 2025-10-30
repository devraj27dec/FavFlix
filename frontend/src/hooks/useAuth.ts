/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/config/api";
import type { UserData } from "@/lib/types";
import { useState } from "react";

export const useAuth = () => {
  const [session , setSession] = useState(false)
  const register = async (data: UserData) => {
    try {
      const res = await api.post("/auth/register", data);
      return res.data;
    } catch (error: any) {
      console.error("Register Error:", error.response?.data || error.message);
      throw error.response?.data || error;
    }
  };

  const login = async (data: UserData) => {
    try {
      const res = await api.post("/auth/login", data);
      const resData = res.data;
      if (resData?.access_token) {
        localStorage.setItem("access_token", resData.access_token);
        setSession(true)
      }

      return resData;
    } catch (error: any) {
      console.error("Login Error:", error.response?.data || error.message);
      throw error.response?.data || error;
    }
  };

  const logout = () => {
    setSession(false)
    localStorage.removeItem("access_token")
    window.location.href = ("/")
  }

  return {
    register,
    login,
    logout,
    session
  };
};

