import { LegalFacadePort } from "core/helpers/legal/legal-facade-port";

export class LegalAdapter implements LegalFacadePort {
  urls = {
    terms: "https://od-legals-production.s3.eu-west-1.amazonaws.com/terms-and-conditions.pdf",
    privacy: "https://od-legals-production.s3.eu-west-1.amazonaws.com/privacy-policy.pdf",
  };
}
