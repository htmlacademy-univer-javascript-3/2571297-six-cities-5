import { getToken, saveToken, dropToken, handleToken } from './token';
import { TOKEN_KEY } from '../constants';

describe('token utils', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should get token from localStorage', () => {
    localStorage.setItem(TOKEN_KEY, 'test-token');
    expect(getToken()).toBe('test-token');
  });

  it('should save token to localStorage', () => {
    saveToken('new-token');
    expect(localStorage.getItem(TOKEN_KEY)).toBe('new-token');
  });

  it('should remove token from localStorage', () => {
    localStorage.setItem(TOKEN_KEY, 'test-token');
    dropToken();
    expect(localStorage.getItem(TOKEN_KEY)).toBeNull();
  });

  describe('handleToken', () => {
    it('should save token when no token in storage', () => {
      handleToken('new-token');
      expect(localStorage.getItem(TOKEN_KEY)).toBe('new-token');
    });

    it('should update token when different token in storage', () => {
      localStorage.setItem(TOKEN_KEY, 'old-token');
      handleToken('new-token');
      expect(localStorage.getItem(TOKEN_KEY)).toBe('new-token');
    });

    it('should not update when same token in storage', () => {
      localStorage.setItem(TOKEN_KEY, 'same-token');
      handleToken('same-token');
      expect(localStorage.getItem(TOKEN_KEY)).toBe('same-token');
    });

    it('should not update when no new token provided', () => {
      localStorage.setItem(TOKEN_KEY, 'existing-token');
      handleToken('');
      expect(localStorage.getItem(TOKEN_KEY)).toBe('existing-token');
    });
  });
});
