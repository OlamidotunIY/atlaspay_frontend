import { AuthStatus } from '../value-objects/auth-status.enum.js';

export interface AuthAccountProps {
  userId?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  country?: string;
  totpEnabled?: boolean;
  status?: string;
  scope?: string;
}

export class AuthAccount {
  constructor(
    public readonly id: string, // string mapped from userId
    public readonly email: string,
    public readonly status: AuthStatus,
    public readonly scope: string,
    public readonly twoFactorEnabled: boolean,
    public readonly firstName?: string,
    public readonly lastName?: string,
    public readonly phone?: string,
    public readonly country?: string
  ) {}

  /**
   * Domain Behaviors / Methods
   */

  isActive(): boolean {
    return this.status === AuthStatus.ACTIVE;
  }

  isUnverified(): boolean {
    return this.status === AuthStatus.UNVERIFIED;
  }

  hasRole(roleName: string): boolean {
    return this.scope.includes(roleName);
  }

  isMerchant(): boolean {
    // Assuming backend returns something like 'MERCHANT' in the scope or status, or you check a specific role
    // For now we'll simulate the old principalType check using scope or just returning true for merchant app context.
    return this.scope.includes('MERCHANT');
  }

  isAdmin(): boolean {
    return this.scope.includes('ADMIN');
  }

  /**
   * Factory method to hydrate raw API JSON into the rich domain class
   */
  static fromJson(data: AuthAccountProps): AuthAccount {
    return new AuthAccount(
      String(data.userId || ''),
      data.email || '',
      (data.status as AuthStatus) || AuthStatus.UNVERIFIED,
      data.scope || '',
      data.totpEnabled || false,
      data.firstName,
      data.lastName,
      data.phone,
      data.country
    );
  }
}
