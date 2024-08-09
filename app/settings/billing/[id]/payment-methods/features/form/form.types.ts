export namespace TPayoutForm {
  export interface Data {
    ethWallet?: string;
    starknetAddress?: string;
    optimismAddress?: string;
    aptosAddress?: string;
    stellarAccountId?: string;
    bankAccount: {
      number?: string;
      bic?: string;
    };
  }
}
