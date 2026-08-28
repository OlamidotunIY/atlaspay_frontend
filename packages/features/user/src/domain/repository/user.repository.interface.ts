import { User } from "../entity/user.entity.js";

export interface IUserRepository {
  getUserById(id: string): Promise<User | null>;
  createUser(user: User): Promise<User>;
  listUsers(): Promise<User[]>;
  updateUser(id: string, user: Partial<User>): Promise<User>;
}