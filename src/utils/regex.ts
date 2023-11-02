/* Letters and space only */
export const ALPHABETICAL_VALIDATOR = /^[A-zÀ-ú ]*$/;

/* International zipcodes light validator for 10 characters long composed of letters and numbers with space or dash in between */
export const ZIPCODE_VALIDATOR = /^[a-zA-Z0-9][a-zA-Z0-9\- ]{0,10}[a-zA-Z0-9]$/;

/* Validate ENS valid wallet names */
export const ENS_DOMAIN_REGEXP =
  /^[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?$/gi;

/* Validate 0x40 ETH wallet or an ENS address */
export const ETH_WALLET_OR_ENS_ADDRESS =
  /^0x[a-fA-F0-9]{40}$|[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/;

/* Validate 0x64 Aptos wallet or an ENS address */
export const APTOS_WALLET = /^0x[a-fA-F0-9]{64}$/;

/* Validate 0x64 Starknet wallet or an ENS address */
export const STARKNET_WALLET = /^0x[a-fA-F0-9]{64}$/;

/* Validate 0x40 Optimism wallet or an ENS address */
export const OPTIMISM_WALLET = /^0x[a-fA-F0-9]{40}$/;

/* Validate BIC */
export const BIC_REGEXP = /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/i;
