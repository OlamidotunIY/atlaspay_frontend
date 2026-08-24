import { useQuery } from '@tanstack/react-query';
import { authRepository } from '../repository/auth.repository.js';
import { createQueryKeyFactory } from '@org/data';

// Reuse the central query key factory from the data package
export const authQueryKeys = createQueryKeyFactory('auth');

export function useAuthAccount() {
  return useQuery({
    // Use the details key for the auth account singleton
    queryKey: authQueryKeys.details(),
    queryFn: () => authRepository.getAuthAccount(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false, // Don't retry on 401
  });
}
