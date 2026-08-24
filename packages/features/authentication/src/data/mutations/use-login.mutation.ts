import { useMutation } from '@tanstack/react-query';
import { authRepository } from '../repository/auth.repository.js';
import { LoginRequestDto } from '../adapters/rest-api/auth.dto.js';

export function useLogin() {
  return useMutation({
    mutationFn: (credentials: LoginRequestDto) => authRepository.login(credentials),
  });
}
