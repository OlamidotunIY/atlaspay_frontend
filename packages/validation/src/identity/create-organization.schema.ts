import { z } from 'zod';
import { BusinessSize, BusinessType } from '@org/organization';

export const BUSINESS_TYPES: Record<BusinessType, string> = {
  RETAIL: 'Retail & E-commerce',
  FINANCE: 'Finance & Fintech',
  EDUCATION: 'Education',
  HEALTHCARE: 'Healthcare',
  HOSPITALITY: 'Hospitality',
  LOGISTICS: 'Logistics & Transportation',
  REAL_ESTATE: 'Real Estate',
  OTHER: 'Other',
};

export const BUSINESS_SIZE: Record<BusinessSize, string> = {
  REGISTERED: 'Registered',
  STARTER: 'Starter',
};

export const CreateOrganizationSchema = z.object({
  businessName: z.string().min(1, 'Business name is required'),
  businessType: z.enum(
    BUSINESS_TYPES,
    'Business type must be from the listed eneum types',
  ),
  businessSize: z.enum(BUSINESS_SIZE),
  logo: z.string().optional(),
});

export type CreateOrganizationInput = z.infer<typeof CreateOrganizationSchema>;
