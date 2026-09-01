import { createQueryKeyFactory, queryClient } from '@org/data';
import { useQuery } from '@tanstack/react-query';
import { invitationApi } from '../adapters/rest-api/invitation.api.js';

export const invitationQueryKeys = createQueryKeyFactory('invitations');

export function useInvitation(token: string, enabled = true) {
  return useQuery(
    {
      queryKey: invitationQueryKeys.detail(token),
      queryFn: () => invitationApi.getInvitation(token),
      enabled: !!token && enabled,
    },
    queryClient
  );
}
