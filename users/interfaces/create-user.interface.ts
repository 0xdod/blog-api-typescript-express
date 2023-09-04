export interface CreateUser {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  email: string;
  firstname?: string;
  lastname?: string;
  username: string;
  password: string;
}
