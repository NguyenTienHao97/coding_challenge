import { memo } from "react";
import ConnectWalletButton from "./ConnectWalletButton";

interface IProps {
  connected: boolean;
  onToggleConnect: () => void;
}

const Header = ({ connected, onToggleConnect }: IProps) => {
  return (
    <header className="topbar">
      <a className="brand" href="#" aria-label="Swap Tokens home">
        <span className="brand-mark">
          <span />
          <span />
          <span />
        </span>
        <span>
          Swap Tokens<span className="brand-dot">.</span>
        </span>
      </a>
      <ConnectWalletButton connected={connected} onToggle={onToggleConnect} />
    </header>
  );
};

export default memo(Header);
