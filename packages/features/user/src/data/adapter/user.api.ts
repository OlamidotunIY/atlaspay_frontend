import { getGlobalApiClient } from '@org/data';
import { ApiResponse } from '@org/shared';
import {
  CreateUserRequestDto,
  ListUsersRequestDto,
  UserDto,
  CreateUserResultDto,
} from './user.dto.js';

const getApi = () => getGlobalApiClient();

export const userApi = {
  createUser: (req: CreateUserRequestDto): Promise<CreateUserResultDto> =>
    getApi().post<ApiResponse<CreateUserResultDto>>('/users', req).then(r => r.data.data),

  listUsers: (params: ListUsersRequestDto): Promise<UserDto[]> =>
    getApi().get<ApiResponse<UserDto[]>>('/users', { params }).then(r => r.data.data),

  getUserById: (userId: string): Promise<UserDto> =>
    getApi().get<ApiResponse<UserDto>>(`/users/${userId}`).then(r => r.data.data),
};
