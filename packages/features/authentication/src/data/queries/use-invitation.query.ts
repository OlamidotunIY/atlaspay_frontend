import { queryClient } from '@org/data';
import { useQuery, useMutation } from '@tanstack/react-query';
import { invitationApi } from '../adapters/rest-api/invitation.api.js';

export const invitationQueryKeys = {
  all: ['invitations'] as const,
  detail: (token: string) => [...invitationQueryKeys.all, token] as const,
};

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

export function useAcceptInvitation() {
  return useMutation({
    mutationFn: (token: string) => invitationApi.acceptInvitation(token),
    onSuccess: () => {
      // Invalidate relevant queries (e.g. org, user profile)
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
    }
  }, queryClient);
}
export function useDeclineInvitation() {
  return useMutation({
    mutationFn: (token: string) => invitationApi.declineInvitation(token),
    onSuccess: (_, token) => {
      queryClient.invalidateQueries({ queryKey: invitationQueryKeys.detail(token) });
    }
  }, queryClient);
}
