import { useMutation } from "@tanstack/react-query";
import { invitationApi } from "../adapters/rest-api/invitation.api.js";
import { queryClient } from "@org/data";

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