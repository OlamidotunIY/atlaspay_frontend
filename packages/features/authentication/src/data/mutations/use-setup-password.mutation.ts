import { useMutation } from '@tanstack/react-query';
import { authRepository } from '../repository/auth.repository.js';
import { SetupPasswordRequestDto } from '../adapters/rest-api/auth.dto.js';

export function useSetupPassword() {
  return useMutation({
    mutationFn: (payload: SetupPasswordRequestDto) => authRepository.setupPassword(payload),
  });
}
