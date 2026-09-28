import { memo, useCallback, useState } from "react";
import TokenIcon from "./TokenIcon";
import { ChevronDown } from "lucide-react";
import { IToken } from "../types";
import { TOKENS } from "../constants/token";

interface IProps {
  selected: IToken;
  onSelect: (token: IToken) => void;
  exclude: string;
}

const TokenPicker = ({ selected, onSelect, exclude }: IProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const choices = TOKENS.filter(
    (t) =>
      t.symbol !== exclude &&
      `${t.symbol} ${t.name}`.toLowerCase().includes(query.toLowerCase()),
  );

  const handleToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  const handleSelect = useCallback(
    (token: IToken) => {
      onSelect(token);
      handleClose();
    },
    [onSelect, handleClose],
  );

  return (
    <div className="picker-wrap">
      <button
        className="token-select"
        onClick={handleToggle}
        type="button"
        aria-expanded={open}
      >
        <TokenIcon token={selected} />
        <span className="token-meta">
          <b>{selected.symbol}</b>
          <small>{selected.name}</small>
        </span>
        <ChevronDown size={16} />
      </button>
      {open && (
        <>
          <button
            className="dismiss"
            aria-label="Close token list"
            onClick={handleClose}
          />
          <div className="token-menu">
            <input
              autoFocus
              placeholder="Search name or symbol"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="token-options" role="listbox">
              {choices.length > 0 ? (
                choices.map((token) => (
                  <button
                    key={token.symbol}
                    type="button"
                    role="option"
                    aria-selected={token.symbol === selected.symbol}
                    onClick={() => handleSelect(token)}
                  >
                    <TokenIcon token={token} />

                    <span className="token-meta">
                      <b>{token.symbol}</b>
                      <small>{token.name}</small>
                    </span>

                    {token.symbol === selected.symbol && (
                      <span className="selected-check" aria-hidden="true">
                        ✓
                      </span>
                    )}
                  </button>
                ))
              ) : (
                <p className="no-results">No tokens found.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(TokenPicker);
