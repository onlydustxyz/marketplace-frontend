export namespace TPayoutForm {
  export interface Data {
    ethWallet?: string;
    starknetAddress?: string;
    optimismAddress?: string;
    aptosAddress?: string;
    sepaAccount: {
      iban?: string;
      bic?: string;
    };
  }
}
