import { memo } from "react";
import { PriceValue, formatNumber } from "../helpers/price";
import { IToken } from "../types";
import TokenIcon from "./TokenIcon";

interface IProps {
  from: IToken;
  to: IToken;
  rate: number;
  prices: PriceValue;
  live: boolean;
}

const MarketSnapshot = ({ from, to, rate, prices, live }: IProps) => {
  return (
    <div className="market-card">
      <div className="side-title">
        <span>Market snapshot</span>
        <span className="live-badge">
          <i /> {live ? "LIVE" : "INDICATIVE"}
        </span>
      </div>
      <div className="pair-visual">
        <div className="overlap-icons">
          <TokenIcon token={from} />
          <TokenIcon token={to} />
        </div>
        <div>
          <strong>
            {from.symbol} <span>/</span> {to.symbol}
          </strong>
          <small>Selected trading pair</small>
        </div>
      </div>
      <div className="market-rate">
        <strong>{formatNumber(rate, 6)}</strong>
        <span>
          {to.symbol} per {from.symbol}
        </span>
      </div>
      <div className="market-divider" />
      <div className="market-foot">
        <span>Indicative value</span>
        <b>
          ${formatNumber(prices[from.symbol] || 0, 2)} <small>per {from.symbol}</small>
        </b>
      </div>
    </div>
  );
};

export default memo(MarketSnapshot);
