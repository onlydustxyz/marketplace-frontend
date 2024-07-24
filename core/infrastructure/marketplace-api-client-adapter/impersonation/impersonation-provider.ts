export interface ImpersonationProvider {
  getHeaders: () => Record<string, string>;
}
