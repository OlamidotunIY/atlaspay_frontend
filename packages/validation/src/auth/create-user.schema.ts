import { z } from 'zod';

export const SignupSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  country: z.string().min(2, 'Country is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  inviteToken: z.string().optional(),
});

export type SignupFormValues = z.infer<typeof SignupSchema>;
