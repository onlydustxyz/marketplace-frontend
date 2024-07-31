import { LegalFacadePort } from "core/helpers/legal/legal-facade-port";

export class LegalAdapter implements LegalFacadePort {
  private urls = {
    terms: `${process.env.NEXT_PUBLIC_LEGALS_S3_BUCKET}/terms-and-conditions.pdf`,
    privacy: `${process.env.NEXT_PUBLIC_LEGALS_S3_BUCKET}/privacy-policy.pdf`,
  };

  getTermsAndConditionsUrl() {
    return this.urls.terms;
  }

  getPrivacyPolicyUrl() {
    return this.urls.privacy;
  }
}
