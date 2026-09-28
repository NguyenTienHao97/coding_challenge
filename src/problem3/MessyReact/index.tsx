import React from "react";
import { useFormattedWalletBalance } from "./hooks";

type Props = React.HTMLAttributes<HTMLDivElement>;

const WalletPage = ({ children, ...rest }: Props) => {
  const rows = useFormattedWalletBalance();

  return (
    <div {...rest}>
      {children}
      {rows}
    </div>
  );
};

export default WalletPage;
