import { create } from "zustand";
import { API_BASE, apiUrl } from "./api";

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
      if (!API_BASE) {
        throw new Error(
          "Falta VITE_API_URL: copiá .env.example a .env con la base del backend",
        );
      }

      const response = await fetch(
        `${apiUrl("generate")}?length=${safeLength}`,
      );
      if (!response.ok) {
        throw new Error(`La API respondió con status ${response.status}`);
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
