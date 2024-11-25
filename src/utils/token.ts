import { TOKEN_KEY } from '../constants';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const saveToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const dropToken = () => localStorage.removeItem(TOKEN_KEY);

export const handleToken = (token: string) => {
  const tokenFromStorage = getToken();

  if ((!tokenFromStorage && token) || (tokenFromStorage && token && tokenFromStorage !== token)) {
    saveToken(token);
  }
};
