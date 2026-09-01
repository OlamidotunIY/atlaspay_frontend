import { createQueryKeyFactory, queryClient } from '@org/data';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { authRepository } from '../repository/auth.repository.js';
import { AuthAccount } from '../../domain/entities/auth-account.entity.js';

// Reuse the central query key factory from the data package
export const authQueryKeys = createQueryKeyFactory('auth');

export function useAuthAccount(
  options?: Omit<
    UseQueryOptions<AuthAccount, Error>,
    'queryKey' | 'queryFn'
  >,
) {
  return useQuery(
    {
      // Use the details key for the auth account singleton
      ...options,
      queryKey: authQueryKeys.details(),
      queryFn: () => authRepository.getAuthAccount(),
    },
    queryClient,
  );
}
