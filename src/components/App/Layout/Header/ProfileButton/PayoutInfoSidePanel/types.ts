export type UserPayoutInfo = {
  profileType: ProfileType;
  firstname?: string;
  lastname?: string;
  companyName?: string;
  identificationNumber?: string;
  address: string;
  postCode: string;
  city: string;
  country: string;
  // payoutSettingsType: PayoutSettingsDisplayType;
  isCompany: boolean;
  usdPreferredMethod: boolean;
  IBAN?: string;
  BIC?: string;
  ethWallet?: string;
  starknetWallet?: string;
  optimismWallet?: string;
  aptosWallet?: string;

  // userId
  // firstname
  // lastname
  // address
  // city
  // postCode
  // country
  // isCompany
  // companyName
  // companyIdentificationNumber
  // usdPreferredMethod
  // ethWallet
  // bic
  // iban
  // arePayoutSettingsValid
  // aptosWallet
  // optimismWallet
  // starknetWallet
};

export enum PayoutSettingsDisplayType {
  BankAddress = "BANK_ADDRESS",
  EthereumIdentity = "ETHEREUM_IDENTITY",
}

export enum PreferredMethod {
  BankAddress = "BANK_ADDRESS",
  EthereumIdentity = "ETHEREUM_IDENTITY",
}

export enum ProfileType {
  Company = "COMPANY",
  Individual = "INDIVIDUAL",
}
