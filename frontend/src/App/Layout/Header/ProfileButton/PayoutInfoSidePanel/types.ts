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
  payoutSettingsType: PayoutSettingsDisplayType;
  ethWallet?: string;
  starknetWallet?: string;
  optimismWallet?: string;
  aptosWallet?: string;
  IBAN?: string;
  BIC?: string;
};

export enum PayoutSettingsDisplayType {
  BankAddress = "BANK_ADDRESS",
  EthereumIdentity = "ETHEREUM_IDENTITY",
}

export enum ProfileType {
  Company = "COMPANY",
  Individual = "INDIVIDUAL",
}
