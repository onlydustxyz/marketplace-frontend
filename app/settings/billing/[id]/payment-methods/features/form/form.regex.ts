export const REGEX = {
  ethWallet: /^0x[a-fA-F0-9]{40}$|[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/,
  starknetAddress: /^0x[a-fA-F0-9]{64}$/,
  optimismAddress: /^0x[a-fA-F0-9]{40}$/,
  aptosAddress: /^0x[a-fA-F0-9]{64}$/,
  stellarAccountId: /^G[A-Z2-7]{55}$/,
};
