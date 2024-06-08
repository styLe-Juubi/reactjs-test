import { Base64 } from "js-base64";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const serialize = (data) => Base64.encode(JSON.stringify(data));
const deserialize = (data) => JSON.parse(Base64.decode(data));

export const useStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "user-storage",
      storage: {
        getItem: (key) => deserialize(localStorage.getItem(key)),
        setItem: (key, value) => localStorage.setItem(key, serialize(value)),
        removeItem: (key) => localStorage.removeItem(key),
      }
    }
  )
);