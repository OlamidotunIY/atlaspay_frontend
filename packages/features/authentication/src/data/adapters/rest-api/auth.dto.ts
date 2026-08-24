import { AuthAccountProps } from "../../../domain/entities/auth-account.entity.js";
import { TokenPairProps } from "../../../domain/entities/token-pair.entity.js";


export interface LoginRequestDto { identifier: string; password: string; }
export interface ChangeTemporaryPasswordRequestDto { identifier: string; oldPassword: string; newPassword: string; }
export interface SetupPasswordRequestDto { setupToken: string; newPassword: string; }
export interface ResendSetupTokenRequestDto { identifier: string; }
export interface CompleteVerificationRequestDto { identifier: string; code: string; type: string; }
export interface VerifyMfaRequestDto { preAuthToken: string; code: string; }
export interface RefreshTokenRequestDto { refreshToken: string; }
export interface LogoutRequestDto { jti: string; }

export interface AuthTokenDto extends TokenPairProps {}

export interface AuthResponseDto {
  requiresTwoFactor: boolean;
  requiresPasswordChange: boolean;
  identifier?: string;
  preAuthToken?: string;
  tokens?: AuthTokenDto;
}

export interface AuthAccountDto extends AuthAccountProps {}
