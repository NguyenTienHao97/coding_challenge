import { memo, useState } from "react";
import {
  ArrowDownUp,
  ArrowUpRight,
  CircleHelp,
  Loader2,
  Settings2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { SwapForm } from "../hooks/useSwapForm";
import { formatNumber } from "../helpers/price";
import TokenPicker from "./TokenPicker";

const SLIPPAGE_OPTIONS = ["0.1", "0.5", "1.0"];

interface IProps {
  swap: SwapForm;
}

const SwapCard = ({ swap }: IProps) => {
  const [slippage, setSlippage] = useState("0.5");
  const [settingsOpen, setSettingsOpen] = useState(false);

  const {
    from,
    to,
    amount,
    touched,
    notice,
    noticeTone,
    valid,
    amountError,
    pairError,
    rate,
    output,
    usd,
    receiveUsd,
    submitLabel,
    submitting,
    setFrom,
    setTo,
    setAmount,
    swapTokens,
    handleAmountChange,
    handleAmountBlur,
    submit,
  } = swap;
  const showAmountError = touched && Boolean(amountError);

  return (
    <div className="swap-card">
      <div className="card-heading">
        <div>
          <span className="heading-icon">
            <ArrowDownUp size={17} />
          </span>
          <span>
            <strong>Swap tokens</strong>
            <small>Trade at the best available rate</small>
          </span>
        </div>
        <button
          className="icon-button"
          aria-label="Swap settings"
          onClick={() => setSettingsOpen((previous) => !previous)}
        >
          <Settings2 size={19} />
        </button>
      </div>

      {settingsOpen && (
        <div className="settings-panel">
          <div>
            <b>Slippage tolerance</b>
            <span>Max price movement before swap</span>
          </div>
          <div className="slippage-options">
            {SLIPPAGE_OPTIONS.map((value) => (
              <button
                className={slippage === value ? "chosen" : ""}
                key={value}
                onClick={() => setSlippage(value)}
              >
                {value}%
              </button>
            ))}
            <label>
              <input
                value={slippage}
                onChange={(event) => setSlippage(event.target.value)}
                aria-label="Custom slippage"
              />
              %
            </label>
          </div>
        </div>
      )}

      <div className={`amount-panel${showAmountError ? " has-error" : ""}`}>
        <div className="panel-top">
          <label htmlFor="amount">You pay</label>
          <span>
            Balance <b>—</b>
          </span>
        </div>
        <div className="amount-row">
          <input
            id="amount"
            inputMode="decimal"
            value={amount}
            onChange={(event) => handleAmountChange(event.target.value)}
            onBlur={handleAmountBlur}
            placeholder="0.00"
            aria-label="Amount to swap"
            aria-invalid={showAmountError}
            aria-describedby={showAmountError ? "amount-error" : undefined}
          />
          <TokenPicker selected={from} onSelect={setFrom} exclude={to.symbol} />
        </div>
        <div className="panel-bottom">
          <span className="usd-value">≈ ${formatNumber(usd, 2)}</span>
          <button
            className="max-button"
            onClick={() => setAmount("1")}
            type="button"
          >
            MAX
          </button>
        </div>
        {showAmountError && (
          <p className="field-error" id="amount-error" role="alert">
            {amountError}
          </p>
        )}
      </div>

      <div className="switch-row">
        <span className="switch-line" />
        <button
          className="switch-button"
          onClick={swapTokens}
          aria-label="Switch currencies"
        >
          <ArrowDownUp size={17} />
        </button>
        <span className="switch-line" />
      </div>

      <div className="amount-panel receive-panel">
        <div className="panel-top">
          <label>You receive</label>
          <span>Estimated</span>
        </div>
        <div className="amount-row">
          <div className="output-amount">
            {valid ? formatNumber(output, 8) : "0.00"}
          </div>
          <TokenPicker selected={to} onSelect={setTo} exclude={from.symbol} />
        </div>
        <div className="panel-bottom">
          <span className="usd-value">≈ ${formatNumber(receiveUsd, 2)}</span>
          <span className="receive-tag">
            <Sparkles size={12} /> Receive
          </span>
        </div>
      </div>

      <div className="rate-details">
        <div className="rate-row">
          <span>
            Exchange rate <CircleHelp size={13} />
          </span>
          {pairError ? (
            <b className="rate-error">{pairError}</b>
          ) : (
            <b>
              1 {from.symbol} = {formatNumber(rate, 6)} {to.symbol}
            </b>
          )}
        </div>
        <div className="rate-row">
          <span>Slippage tolerance</span>
          <b>{slippage || "0"}%</b>
        </div>
      </div>

      {notice && (
        <div className={`notice notice-${noticeTone}`} role="status">
          {notice}
        </div>
      )}

      <button
        className="submit-button"
        onClick={submit}
        disabled={Boolean(amountError || pairError) || submitting}
      >
        {submitLabel}
        {submitting ? (
          <Loader2 size={18} className="spin" />
        ) : (
          <ArrowUpRight size={18} />
        )}
      </button>

      <div className="secure-note">
        <ShieldCheck size={14} /> Non-custodial · You stay in control
      </div>
    </div>
  );
};

export default memo(SwapCard);
