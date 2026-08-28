import { User } from '../../domain/entity/user.entity.js';
import { IUserRepository } from '../../domain/repository/user.repository.interface.js';
import { userApi } from '../adapter/user.api.js';
import { UserDto } from '../adapter/user.dto.js';
import { Country } from '../../domain/value-objects/country.enum.js';

export class UserRepository implements IUserRepository {
  private mapDtoToUser(dto: UserDto): User {
    return new User(
      String(dto.id),
      dto.email ?? '',
      dto.firstName ?? '',
      dto.lastName ?? '',
      dto.phone ?? '',
      (dto.metadata?.['country'] ?? '') as Country,
      dto.createdAt ?? '',
      dto.createdAt ?? '',
    );
  }

  async getUserById(id: string): Promise<User | null> {
    const dto = await userApi.getUserById(id);
    return this.mapDtoToUser(dto);
  }

  async createUser(user: User): Promise<User> {
    await userApi.createUser({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phoneNumber,
      country: user.country,
    });
    // Re-fetch the created user — API only returns the ID
    return user;
  }

  async listUsers(): Promise<User[]> {
    const dtos = await userApi.listUsers({});
    return dtos.map((dto) => this.mapDtoToUser(dto));
  }

  async updateUser(id: string, user: Partial<User>): Promise<User> {
    throw new Error('updateUser: not yet supported by the backend API.');
  }
}

export const userRepository = new UserRepository();
