export interface LegalFacadePort {
  urls: {
    terms: string;
    privacy: string;
  };
  getTermsAndConditionsUrl(): string;
  getPrivacyPolicyUrl(): string;
}
