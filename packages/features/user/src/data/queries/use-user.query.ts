import { createQueryKeyFactory, queryClient } from '@org/data';
import { useQuery } from '@tanstack/react-query';
import { userRepository } from '../repository/user.repository.js';
import { ListUsersRequestDto } from '../adapter/user.dto.js';

export const userQueryKeys = createQueryKeyFactory('user');

export function useUserById(id: string) {
  return useQuery(
    {
      queryKey: userQueryKeys.detail(id),
      queryFn: () => userRepository.getUserById(id),
    },
    queryClient,
  );
}

export function useListUsers(params: ListUsersRequestDto = {}) {
  return useQuery(
    {
      queryKey: userQueryKeys.list({ ...params }),
      queryFn: () => userRepository.listUsers(),
    },
    queryClient,
  );
}
