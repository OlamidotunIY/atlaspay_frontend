import { useMutation } from '@tanstack/react-query';
import { authRepository } from '../repository/auth.repository.js';
import { CompleteVerificationRequestDto } from '../adapters/rest-api/auth.dto.js';

export function useVerifyEmail() {
  return useMutation({
    mutationFn: (payload: CompleteVerificationRequestDto) => authRepository.verifyEmail(payload),
  });
}
