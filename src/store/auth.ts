import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  user: IUser | null;
};

type Actions = {
  login: (user: IUser) => void;
  logout: () => void;
};

export const useAuth = create<State & Actions>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
