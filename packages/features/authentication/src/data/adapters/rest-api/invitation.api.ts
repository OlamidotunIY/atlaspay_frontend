import { getGlobalApiClient } from '@org/data';
import { ApiResponse } from '@org/shared';
import { InvitationDto } from './invitation.dto.js';

const getApi = () => getGlobalApiClient();

export const invitationApi = {
  getInvitation: (token: string): Promise<InvitationDto> =>
    getApi().get<ApiResponse<InvitationDto>>(`/api/v1/invitations/${token}`).then(r => r.data.data),

  acceptInvitation: (token: string): Promise<void> =>
    getApi().post<ApiResponse<void>>(`/api/v1/invitations/${token}/accept`).then(() => undefined),

  declineInvitation: (token: string): Promise<void> =>
    getApi().post<ApiResponse<void>>(`/api/v1/invitations/${token}/decline`).then(() => undefined),
};
