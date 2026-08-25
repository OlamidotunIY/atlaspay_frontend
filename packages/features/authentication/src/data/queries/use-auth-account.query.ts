import { createQueryKeyFactory, queryClient } from '@org/data';
import { useQuery } from '@tanstack/react-query';
import { authRepository } from '../repository/auth.repository.js';

// Reuse the central query key factory from the data package
export const authQueryKeys = createQueryKeyFactory('auth');

export function useAuthAccount() {
  return useQuery(
    {
      // Use the details key for the auth account singleton
      queryKey: authQueryKeys.details(),
      queryFn: () => authRepository.getAuthAccount(),
    },
    queryClient,
  );
}
