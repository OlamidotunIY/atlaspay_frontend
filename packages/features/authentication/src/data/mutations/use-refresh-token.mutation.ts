import { useMutation } from '@tanstack/react-query';
import { authRepository } from '../repository/auth.repository.js';

export function useRefreshToken() {
  return useMutation({
    mutationFn: (token: string) => authRepository.refreshToken(token),
  });
}
