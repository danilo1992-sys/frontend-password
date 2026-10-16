import { create } from "zustand";

const API_URL = "http://localhost:8000/router/";
const MIN_LENGTH = 8;
const MAX_LENGTH = 256;

type PasswordState = {
  password: string;
  loading: boolean;
  error: string | null;
  fetchPassword: (length?: number) => Promise<void>;
};
export const usePassword = create<PasswordState>()((set) => ({
  password: "",
  loading: false,
  error: null,

  fetchPassword: async (length = 16) => {
    const safeLength = Math.min(
      MAX_LENGTH,
      Math.max(MIN_LENGTH, Math.trunc(length) || MIN_LENGTH),
    );

    set({ loading: true, error: null });

    try {
      const response = await fetch(`${API_URL}generate?length=${safeLength}`);
      if (!response.ok) {
        throw new Error("password no generada");
      }

      const data: unknown = await response.json();
      if (typeof data !== "string" || data.length === 0) {
        throw new Error("password no generada");
      }

      set({ password: data });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "password no generada",
      });
    } finally {
      set({ loading: false });
    }
  },
}));
