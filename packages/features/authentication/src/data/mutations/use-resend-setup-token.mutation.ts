import { useMutation } from '@tanstack/react-query';
import { authRepository } from '../repository/auth.repository.js';

export function useResendSetupToken() {
  return useMutation({
    mutationFn: (identifier: string) => authRepository.resendSetupToken(identifier),
  });
}
