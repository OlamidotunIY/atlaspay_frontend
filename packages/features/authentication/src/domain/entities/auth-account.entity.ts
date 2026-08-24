import { PrincipalType } from '../value-objects/principal-type.vo.js';
import { AuthStatus } from '../value-objects/auth-status.enum.js';
import { Role } from '../value-objects/role.enum.js';

export interface AuthAccountProps {
  id: string;
  email: string;
  principalType: string;
  status: string;
  roles: string[];
  twoFactorEnabled: boolean;
  createdAt: string;
  employeeCode?: string;
}

export class AuthAccount {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly principalType: PrincipalType,
    public readonly status: AuthStatus,
    public readonly roles: Role[],
    public readonly twoFactorEnabled: boolean,
    public readonly createdAt: string,
    public readonly employeeCode?: string // Used for ADMIN principals
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

  hasRole(role: Role): boolean {
    return this.roles.includes(role);
  }

  isMerchant(): boolean {
    return this.principalType === 'MERCHANT';
  }

  isAdmin(): boolean {
    return this.principalType === 'ADMIN';
  }

  /**
   * Factory method to hydrate raw API JSON into the rich domain class
   */
  static fromJson(data: AuthAccountProps): AuthAccount {
    return new AuthAccount(
      data.id,
      data.email,
      data.principalType as PrincipalType,
      data.status as AuthStatus,
      (data.roles || []).map(r => r as Role),
      data.twoFactorEnabled,
      data.createdAt,
      data.employeeCode
    );
  }
}
