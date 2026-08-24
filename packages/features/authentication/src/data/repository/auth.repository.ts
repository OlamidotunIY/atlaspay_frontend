import { IAuthRepository, AuthResult } from '../../domain/repository/auth.repository.interface.js';
import { authApi } from '../adapters/rest-api/auth.api.js';
import { TokenPair } from '../../domain/entities/token-pair.entity.js';
import { AuthAccount } from '../../domain/entities/auth-account.entity.js';
import { AuthResponseDto } from '../adapters/rest-api/auth.dto.js';

export class AuthRepository implements IAuthRepository {

  private mapAuthResponseToResult(dto: AuthResponseDto): AuthResult {
    if (dto.requiresTwoFactor && dto.preAuthToken) {
      return { type: 'requires_2fa', preAuthToken: dto.preAuthToken };
    }
    if (dto.requiresPasswordChange && dto.identifier) {
      return { type: 'requires_password_change', identifier: dto.identifier };
    }
    if (dto.tokens) {
      return {
        type: 'success',
        tokens: TokenPair.fromJson(dto.tokens)
      };
    }
    throw new Error('Invalid authentication state returned from server');
  }

  async login(credentials: { identifier: string; password: string }): Promise<AuthResult> {
    const response = await authApi.login(credentials);
    return this.mapAuthResponseToResult(response);
  }

  async changeTemporaryPassword(payload: { identifier: string; oldPassword: string; newPassword: string }): Promise<AuthResult> {
    const response = await authApi.changeTemporaryPassword(payload);
    return this.mapAuthResponseToResult(response);
  }

  async setupPassword(payload: { setupToken: string; newPassword: string }): Promise<AuthResult> {
    const response = await authApi.setupPassword(payload);
    return this.mapAuthResponseToResult(response);
  }

  async resendSetupToken(identifier: string): Promise<void> {
    await authApi.resendSetupToken({ identifier });
  }

  async verifyEmail(payload: { identifier: string; code: string; type: string }): Promise<void> {
    await authApi.verifyEmail(payload);
  }

  async verifyMfa(payload: { preAuthToken: string; code: string }): Promise<TokenPair> {
    const dto = await authApi.verifyMfa(payload);
    return TokenPair.fromJson(dto);
  }

  async refreshToken(token: string): Promise<TokenPair> {
    const dto = await authApi.refreshToken({ refreshToken: token });
    return TokenPair.fromJson(dto);
  }

  async logout(jti: string): Promise<void> {
    await authApi.logout({ jti });
  }

  async getAuthAccount(): Promise<AuthAccount> {
    const dto = await authApi.getAuthAccount();
    return AuthAccount.fromJson(dto);
  }
}

// Export singleton for use in TanStack mutations
export const authRepository = new AuthRepository();
