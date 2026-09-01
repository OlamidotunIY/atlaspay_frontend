import type { components } from '@org/data';

// ---- Request DTOs ----
export type LoginRequestDto                    = components['schemas']['LoginRequestDto'];
export type ChangeTemporaryPasswordRequestDto  = components['schemas']['ChangeTemporaryPasswordRequestDto'];
export type SetupPasswordRequestDto            = components['schemas']['SetupPasswordRequestDto'];
export type ResendSetupTokenRequestDto         = components['schemas']['ResendSetupTokenRequestDto'];
export type CompleteVerificationRequestDto     = components['schemas']['CompleteVerificationRequestDto'];
export type VerifyMfaRequestDto                = components['schemas']['VerifyMfaRequestDto'];
export type RefreshTokenRequestDto             = components['schemas']['RefreshTokenRequestDto'];
export type LogoutRequestDto                   = components['schemas']['LogoutRequestDto'];

// ---- Response DTOs ----
export type AuthResponseDto                    = components['schemas']['AuthResponseDto'];
export type AuthTokenDto                       = components['schemas']['AuthTokenDto'];
export type VerificationResponseDto            = components['schemas']['VerificationResponseDto'];

export type AuthAccountDto = components['schemas']['AuthenticatedUserDto'];

// Ensure strictly typed variants from backend schema
// The backend hasn't converted these to enums in the spec yet, but we enforce them based on domain knowledge.
export type OnboardingStatus = 'HAS_ORG' | 'NO_ORG' | 'NO_USER';
export type VerificationNextAction = 'SETUP_PASSWORD';
