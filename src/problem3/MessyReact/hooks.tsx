import { conditionFilter, conditionSort } from "./helpers";
import { FormattedWalletBalance, WalletBalance } from "./types";

export const useFormattedWalletBalance = () => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances = useMemo(() => {
    return balances.filter(conditionFilter).sort(conditionSort);
  }, [balances]);

  const formattedBalances = useMemo(
    () =>
      sortedBalances.map(
        (balance: WalletBalance): FormattedWalletBalance => ({
          ...balance,
          formatted: balance.amount.toFixed(),
          usdValue: (prices[balance.currency] ?? 0) * balance.amount,
        }),
      ),
    [sortedBalances, prices],
  );

  const rows = useMemo(() => {
    if (formattedBalances.length === 0) {
      return (
        <p className={"flex items-center align-center"}>
          No wallet balances to display.
        </p>
      );
    }

    return formattedBalances.map(
      (balance: FormattedWalletBalance, index: number) => (
        <WalletRow
          className={classes.row}
          key={`${balance.blockchain}-${balance.currency}-${index}`}
          amount={balance.amount}
          usdValue={balance.usdValue}
          formattedAmount={balance.formatted}
        />
      ),
    );
  }, [formattedBalances]);

  return rows;
};
