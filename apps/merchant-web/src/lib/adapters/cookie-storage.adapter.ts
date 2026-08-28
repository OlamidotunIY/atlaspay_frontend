import Cookies from 'js-cookie';
import { TokenStorage } from '@org/authentication';

export const cookieStorageAdapter: TokenStorage = {
  setTokens: (accessToken: string, refreshToken: string) => {
    Cookies.set('access_token', accessToken, { secure: true, sameSite: 'strict' });
    Cookies.set('refresh_token', refreshToken, { secure: true, sameSite: 'strict' });
  },
  clearTokens: () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
  }
};
