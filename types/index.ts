export interface ICategoryProps {
  id: string; 
  categoryId:string;         
  name: string;
  image: string;
  description?: string;
}

export interface IUser {
  id: string;
  firstName?: string;
  lastName?:string;
  password:string;
  email?: string;
  role?: "client" | "admin";
  status: "active" | "inactive" | "block" | "unblock";
  createdAt: string;
  updatedAt: string;
}

export interface IUserState {
  user: IUser[] | null;
  token: string | null;
  role: "admin" | "guest" | "client";
  loading: boolean;
  error: string | null;
  isLoggedIn: boolean;
  status: "active" | "inactive" | "block" | "unblock";
}