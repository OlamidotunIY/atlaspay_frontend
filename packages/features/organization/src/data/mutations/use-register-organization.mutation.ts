import { queryClient } from '@org/data';
import { useMutation } from '@tanstack/react-query';
import { organizationApi } from '../adapters/rest-api/organization.api.js';
import { RegisterOrganizationRequest } from '../adapters/rest-api/organization.dto.js';

export function useRegisterOrganization() {
  return useMutation({
    mutationFn: (req: RegisterOrganizationRequest) => organizationApi.register(req),
    onSuccess: () => {
      // Typically invalidate user profile or auth status since they now have an org
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
    }
  }, queryClient);
}
