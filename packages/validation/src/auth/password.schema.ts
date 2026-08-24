import { z } from 'zod';

export const ChangeTemporaryPasswordSchema = z.object({
  identifier: z.string().min(1, 'Identifier is required'),
  oldPassword: z.string().min(1, 'Old password is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
});

export type ChangeTemporaryPasswordInput = z.infer<typeof ChangeTemporaryPasswordSchema>;

export const SetupPasswordSchema = z.object({
  setupToken: z.string().min(1, 'Setup token is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
});

export type SetupPasswordInput = z.infer<typeof SetupPasswordSchema>;
