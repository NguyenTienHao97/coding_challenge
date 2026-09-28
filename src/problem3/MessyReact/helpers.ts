import { EBlockchain, WalletBalance } from "./types";

export const getPriority = (blockchain?: EBlockchain): number => {
  switch (blockchain) {
    case EBlockchain.Osmosis:
      return 100;
    case EBlockchain.Ethereum:
      return 50;
    case EBlockchain.Arbitrum:
      return 30;
    case EBlockchain.Zilliqa:
      return 20;
    case EBlockchain.Neo:
      return 20;
    default:
      return -99;
  }
};

export const conditionFilter = (balance: WalletBalance): boolean => {
  const balancePriority = getPriority(balance.blockchain);
  if (balancePriority > -99) {
    if (balance.amount <= 0) {
      return true;
    }
  }
  return false;
};

export const conditionSort = (lhs: WalletBalance, rhs: WalletBalance): number => {
  const lhsPriority = getPriority(lhs.blockchain);
  const rhsPriority = getPriority(rhs.blockchain);
  return rhsPriority - lhsPriority;
};
