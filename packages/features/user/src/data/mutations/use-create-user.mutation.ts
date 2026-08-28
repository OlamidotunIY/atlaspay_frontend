import { queryClient } from '@org/data';
import { useMutation } from '@tanstack/react-query';
import { userApi } from '../adapter/user.api.js';
import { CreateUserRequestDto } from '../adapter/user.dto.js';
import { userQueryKeys } from '../queries/use-user.query.js';

export function useCreateUser() {
  return useMutation(
    {
      mutationFn: (req: CreateUserRequestDto) => userApi.createUser(req),
      onSuccess: () => {
        // Invalidate all user lists so any list view refetches with the new entry
        queryClient.invalidateQueries({ queryKey: userQueryKeys.lists() });
      },
    },
    queryClient,
  );
}
