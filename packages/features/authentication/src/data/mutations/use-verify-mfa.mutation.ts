import { useMutation } from '@tanstack/react-query';
import { authRepository } from '../repository/auth.repository.js';
import { VerifyMfaRequestDto } from '../adapters/rest-api/auth.dto.js';

export function useVerifyMfa() {
  return useMutation({
    mutationFn: (payload: VerifyMfaRequestDto) => authRepository.verifyMfa(payload),
  });
}
