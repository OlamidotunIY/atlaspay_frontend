import { queryClient } from '@org/data';
import { useMutation } from '@tanstack/react-query';
import { authRepository } from '../repository/auth.repository.js';

export function useLogout() {
  return useMutation({
    mutationFn: (jti: string) => authRepository.logout(jti),
  }, queryClient);
}
