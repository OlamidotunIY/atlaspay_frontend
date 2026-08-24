import { TokenPair } from '../entities/token-pair.entity.js';
import { AuthAccount } from '../entities/auth-account.entity.js';

export type AuthResult = 
  | { type: 'success'; tokens: TokenPair }
  | { type: 'requires_2fa'; preAuthToken: string }
  | { type: 'requires_password_change'; identifier: string };

export interface IAuthRepository {
  login(credentials: { identifier: string; password: string }): Promise<AuthResult>;
  changeTemporaryPassword(payload: { identifier: string; oldPassword: string; newPassword: string }): Promise<AuthResult>;
  setupPassword(payload: { setupToken: string; newPassword: string }): Promise<AuthResult>;
  resendSetupToken(identifier: string): Promise<void>;
  verifyEmail(payload: { identifier: string; code: string; type: string }): Promise<void>;
  verifyMfa(payload: { preAuthToken: string; code: string }): Promise<TokenPair>;
  refreshToken(token: string): Promise<TokenPair>;
  logout(jti: string): Promise<void>;
  getAuthAccount(): Promise<AuthAccount>;
}
