import { queryClient } from '@org/data';
import { useMutation } from '@tanstack/react-query';
import { authRepository } from '../repository/auth.repository.js';
import { ChangeTemporaryPasswordRequestDto } from '../adapters/rest-api/auth.dto.js';

export function useChangeTemporaryPassword() {
  return useMutation({
    mutationFn: (payload: ChangeTemporaryPasswordRequestDto) => authRepository.changeTemporaryPassword(payload),
  }, queryClient);
}
