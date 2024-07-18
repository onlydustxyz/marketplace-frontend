export interface AuthProvider {
  isAuthenticated: boolean;
  getAccessToken: () => Promise<string>;
  logout: () => void;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  loginWithRedirect: (...args: any) => Promise<void>;
}
