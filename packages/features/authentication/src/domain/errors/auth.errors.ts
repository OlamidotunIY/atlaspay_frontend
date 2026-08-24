export class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid credentials provided');
    this.name = 'InvalidCredentialsError';
  }
}

export class AccountSuspendedError extends Error {
  constructor() {
    super('Account has been suspended. Contact support.');
    this.name = 'AccountSuspendedError';
  }
}

export class AccountUnverifiedError extends Error {
  constructor() {
    super('Please verify your email before logging in');
    this.name = 'AccountUnverifiedError';
  }
}

export class TwoFactorRequiredError extends Error {
  constructor(public readonly preAuthToken: string) {
    super('Two-factor authentication required');
    this.name = 'TwoFactorRequiredError';
  }
}

export class PasswordChangeRequiredError extends Error {
  constructor(public readonly identifier: string) {
    super('A password change is required to proceed');
    this.name = 'PasswordChangeRequiredError';
  }
}

export class SessionExpiredError extends Error {
  constructor() {
    super('Session expired. Please log in again.');
    this.name = 'SessionExpiredError';
  }
}
