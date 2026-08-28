import type { components } from '@org/data';

// ---- Request DTOs ----
export type CreateUserRequestDto        = components['schemas']['CreateUserRequest'];
export type ListUsersRequestDto         = components['schemas']['ListUsersRequestDto'];

// ---- Response DTOs ----
export type UserDto                     = components['schemas']['UserDto'];
export type CreateUserResultDto         = components['schemas']['CreateUserResult'];
