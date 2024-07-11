export interface AuthProvider {
  getAccessToken: () => Promise<string>;
  logout: () => void;
  isAuthenticated: boolean;
}
