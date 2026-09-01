import type { components } from '@org/data';

export type RegisterOrganizationRequest = components['schemas']['RegisterOrganizationRequest'];
export type RegisterOrganizationResult = components['schemas']['RegisterOrganizationResult'];
export type OrganizationProfileDto = components['schemas']['OrganizationProfileDto'];
export type BusinessType =
  RegisterOrganizationRequest['businessType'];

export type BusinessSize =
  RegisterOrganizationRequest['businessSize'];

// Compliance related types
export type CompleteComplianceProfileRequest = components['schemas']['CompleteComplianceProfileRequest'];
export type CompleteComplianceOwnerRequest = components['schemas']['CompleteComplianceOwnerRequest'];
export type CompleteComplianceContactRequest = components['schemas']['CompleteComplianceContactRequest'];
export type CompleteComplianceAccountRequest = components['schemas']['CompleteComplianceAccountRequest'];
export type CompleteComplianceServiceAgreementRequest = components['schemas']['CompleteComplianceServiceAgreementRequest'];
