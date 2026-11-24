import { UserType } from "@/app/types/UserType";

export type UserContextType = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  logout: () => Promise<void>;
  loading: boolean;
};