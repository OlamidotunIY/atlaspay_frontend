import Cookies from 'js-cookie';
import { TokenStorage } from '@org/authentication';

export const cookieStorageAdapter: TokenStorage = {
  setTokens: (accessToken: string, refreshToken: string) => {
    Cookies.set('access_token', accessToken, { secure: true, sameSite: 'strict', expires: 7 });
    Cookies.set('refresh_token', refreshToken, { secure: true, sameSite: 'strict', expires: 7 });
  },
  getTokens: () => {
    return {
      accessToken: Cookies.get('access_token') || null,
      refreshToken: Cookies.get('refresh_token') || null,
    };
  },
  clearTokens: () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
  }
};
