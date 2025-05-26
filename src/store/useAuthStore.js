import { create } from "zustand";
import { API_URL } from "../context/WorkoutContext";

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,

  login: async (email, password) => {
    try {
      const response = await fetch(`${API_URL}user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        return { error: json.error || "登入失敗" };
      }

      localStorage.setItem("user", JSON.stringify(json));

      // 更新 store 狀態
      set({ user: json });

      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { error: "網路錯誤，請稍後再試" };
    }
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));
