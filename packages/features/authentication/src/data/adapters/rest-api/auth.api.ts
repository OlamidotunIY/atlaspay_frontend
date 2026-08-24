import { getGlobalApiClient } from '@org/data';
import { ApiResponse } from '@org/shared';
import {
  LoginRequestDto, ChangeTemporaryPasswordRequestDto, SetupPasswordRequestDto,
  ResendSetupTokenRequestDto, CompleteVerificationRequestDto, VerifyMfaRequestDto,
  RefreshTokenRequestDto, LogoutRequestDto, AuthResponseDto, AuthTokenDto, AuthAccountDto
} from './auth.dto.js';

const getApi = () => getGlobalApiClient();

export const authApi = {
  login: (req: LoginRequestDto): Promise<AuthResponseDto> =>
    getApi().post<ApiResponse<AuthResponseDto>>('/auth/login', req).then(r => r.data.data),

  changeTemporaryPassword: (req: ChangeTemporaryPasswordRequestDto): Promise<AuthResponseDto> =>
    getApi().post<ApiResponse<AuthResponseDto>>('/auth/password/change', req).then(r => r.data.data),

  setupPassword: (req: SetupPasswordRequestDto): Promise<AuthResponseDto> =>
    getApi().post<ApiResponse<AuthResponseDto>>('/auth/setup-password', req).then(r => r.data.data),

  resendSetupToken: (req: ResendSetupTokenRequestDto): Promise<void> =>
    getApi().post<ApiResponse<void>>('/auth/setup-password/resend', req).then(() => undefined),

  verifyEmail: (req: CompleteVerificationRequestDto): Promise<void> =>
    getApi().post<ApiResponse<void>>('/auth/verify-email', req).then(() => undefined),

  verifyMfa: (req: VerifyMfaRequestDto): Promise<AuthTokenDto> =>
    getApi().post<ApiResponse<AuthTokenDto>>('/auth/mfa/verify', req).then(r => r.data.data),

  refreshToken: (req: RefreshTokenRequestDto): Promise<AuthTokenDto> =>
    getApi().post<ApiResponse<AuthTokenDto>>('/auth/refresh', req).then(r => r.data.data),

  logout: (req: LogoutRequestDto): Promise<void> =>
    getApi().post<ApiResponse<void>>('/auth/logout', req).then(() => undefined),

  getAuthAccount: (): Promise<AuthAccountDto> =>
    getApi().get<ApiResponse<AuthAccountDto>>('/auth/me').then(r => r.data.data),
};
