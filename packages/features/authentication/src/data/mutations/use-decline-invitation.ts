import { useMutation } from "@tanstack/react-query";
import { invitationApi, invitationQueryKeys } from "../../index.js";
import { queryClient } from "@org/data";

export function useDeclineInvitation() {
  return useMutation({
    mutationFn: (token: string) => invitationApi.declineInvitation(token),
    onSuccess: (_, token) => {
      queryClient.invalidateQueries({ queryKey: invitationQueryKeys.detail(token) });
    }
  }, queryClient);
}