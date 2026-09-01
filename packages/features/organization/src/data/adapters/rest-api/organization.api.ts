import { getGlobalApiClient } from '@org/data';
import { ApiResponse } from '@org/shared';
import {
  RegisterOrganizationRequest,
  RegisterOrganizationResult,
  OrganizationProfileDto,
  CompleteComplianceProfileRequest,
  CompleteComplianceOwnerRequest,
  CompleteComplianceContactRequest,
  CompleteComplianceAccountRequest,
  CompleteComplianceServiceAgreementRequest,
} from '../dtos/organization.dto.js';

const getApi = () => getGlobalApiClient();

export const organizationApi = {
  register: (
    req: RegisterOrganizationRequest,
  ): Promise<RegisterOrganizationResult> =>
    getApi()
      .post<ApiResponse<RegisterOrganizationResult>>(
        '/Organizations',
        req,
      )
      .then((r) => r.data.data),

  getProfile: (): Promise<OrganizationProfileDto> =>
    getApi()
      .get<ApiResponse<OrganizationProfileDto>>('/Organizations/profile')
      .then((r) => r.data.data),

  getComplianceStatus: (): Promise<string> =>
    getApi()
      .get<ApiResponse<string>>('/Organizations/compliance')
      .then((r) => r.data.data),

  submitCompliance: (): Promise<void> =>
    getApi()
      .post<ApiResponse<void>>('/Organizations/compliance/submit')
      .then(() => undefined),

  completeProfile: (req: CompleteComplianceProfileRequest): Promise<void> =>
    getApi()
      .put<ApiResponse<void>>('/Organizations/compliance/profile', req)
      .then(() => undefined),

  completeOwner: (req: CompleteComplianceOwnerRequest): Promise<void> =>
    getApi()
      .put<ApiResponse<void>>('/Organizations/compliance/owner', req)
      .then(() => undefined),

  completeContact: (req: CompleteComplianceContactRequest): Promise<void> =>
    getApi()
      .put<ApiResponse<void>>('/Organizations/compliance/contact', req)
      .then(() => undefined),

  completeAccount: (req: CompleteComplianceAccountRequest): Promise<void> =>
    getApi()
      .put<ApiResponse<void>>('/Organizations/compliance/account', req)
      .then(() => undefined),

  completeServiceAgreement: (
    req: CompleteComplianceServiceAgreementRequest,
  ): Promise<void> =>
    getApi()
      .put<ApiResponse<void>>(
        '/Organizations/compliance/service-agreement',
        req,
      )
      .then(() => undefined),
};
