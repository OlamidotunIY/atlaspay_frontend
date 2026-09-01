import type { components } from '@org/data';

export type InvitationDto = components['schemas']['InvitationDto'];

// The backend endpoints for invitations
export interface AcceptInvitationRequest {
  token: string;
}
export interface DeclineInvitationRequest {
  token: string;
}
