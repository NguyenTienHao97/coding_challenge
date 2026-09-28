export enum EBlockchain {
  Ethereum = "Ethereum",
  Osmosis = "Osmosis",
  Arbitrum = "Arbitrum",
  Zilliqa = "Zilliqa",
  Neo = "Neo",
}

export interface WalletBalance {
  currency: string;
  blockchain?: EBlockchain;
  amount: number;
}

export interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
  usdValue: number;
}
