export interface AuthAdapter {
  getAccessToken: () => Promise<string>;
  logout: () => void;
  isAuthenticated: boolean;
}
