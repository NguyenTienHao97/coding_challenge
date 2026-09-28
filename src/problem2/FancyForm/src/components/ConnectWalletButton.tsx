import { memo } from "react";
import { Wallet } from "lucide-react";

interface IProps {
  connected: boolean;
  onToggle: () => void;
}

const ConnectWalletButton = ({ connected, onToggle }: IProps) => {
  return (
    <button
      className={`wallet-button${connected ? " connected" : ""}`}
      onClick={onToggle}
      type="button"
    >
      <Wallet size={15} />
      {connected ? "Connected" : "Connect Wallet"}
    </button>
  );
};

export default memo(ConnectWalletButton);
