import { User } from "@/typings";
import { create } from "zustand";

interface AuthStore {
   user: User | null;
   setUser(data: any): void;
}

export const useAuthStore = create<AuthStore>((set) => ({
   user: null,
   setUser: (data: any) => set({ user: data }),
}));
