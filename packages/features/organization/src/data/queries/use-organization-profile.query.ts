import { useQuery } from '@tanstack/react-query';
import { organizationApi } from '../adapters/rest-api/organization.api.js';

export function useOrganizationProfile() {
  return useQuery({
    queryKey: ['organization', 'profile'],
    queryFn: async () => {
      return await organizationApi.getProfile();
    },
  });
}
