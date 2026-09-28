import { IToken } from "../types";

export type PriceValue = Record<string, number>;

export const sanitizeAmountInput = (value: string) =>
  value
    .replace(/,/g, ".")
    .replace(/[^0-9.]/g, "")
    .replace(/(\..*)\./g, "$1");

export const normalizePrices = (data: unknown): PriceValue => {
  const rows = Array.isArray(data)
    ? data
    : Object.entries(data as Record<string, unknown>).map(
        ([currency, price]) => ({
          currency,
          price,
        }),
      );

  const next: PriceValue = {};

  rows.forEach((row) => {
    const symbol = String(row?.currency ?? row?.symbol ?? row?.token ?? "");
    const price = Number(row?.price ?? row?.amount);

    if (symbol && Number.isFinite(price) && price > 0) {
      next[symbol] = price;
    }
  });

  return next;
};

export const formatNumber = (value: number, max = 6) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: max,
  }).format(value);

export const getRate = (
  prices: PriceValue,
  from: IToken,
  to: IToken,
): number => {
  const fromPrice = prices[from.symbol];
  const toPrice = prices[to.symbol];

  return fromPrice && toPrice ? fromPrice / toPrice : 0;
};

export const getUsdValue = (amount: number, tokenPrice: number) =>
  Number(amount) > 0 ? Number(amount) * (tokenPrice || 0) : 0;
