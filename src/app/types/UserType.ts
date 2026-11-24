export type UserType = {
  id: number;
  email: string;
  name: string;
  role: "user" | "admin";
};