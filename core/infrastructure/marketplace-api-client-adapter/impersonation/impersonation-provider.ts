export interface ImpersonationProvider {
  getImpersonationHeaders: () => Record<string, string>;
}
