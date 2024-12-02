import { Task } from "./task";

export interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    tasks:Task[];

  }
  
  export enum Role {
    ADMIN = 'admin',
    USER = 'user',
  }
  

