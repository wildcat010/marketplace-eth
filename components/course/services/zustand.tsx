import { create } from "zustand";

export const useEmailStore = create((set) => ({
  currentEmail: "",
  purchases: [],

  setCurrentEmail: (email) => set({ currentEmail: email }),

  addPurchase: (email) =>
    set((state) => ({ purchases: [...state.purchases, email] })),
}));
