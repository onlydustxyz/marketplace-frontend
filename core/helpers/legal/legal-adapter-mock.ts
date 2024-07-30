import { LegalFacadePort } from "core/helpers/legal/legal-facade-port";

export class LegalAdapterMock implements LegalFacadePort {
  getTermsAndConditionsUrl: () => "";
  getPrivacyPolicyUrl: () => "";
}
