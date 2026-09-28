import { memo, useState } from "react";
import { IToken } from "../types";
import { TOKEN_ICON_URL } from "../constants/common";

interface IProps {
  token: IToken;
  size?: string;
}

const TokenIcon = ({ token, size = "normal" }: IProps) => {
  const [failed, setFailed] = useState(false);
  return (
    <span className={`token-badge ${size} ${token.symbol.toLowerCase()}`}>
      {!failed ? (
        <img
          src={`${TOKEN_ICON_URL}${token.symbol}.svg`}
          alt=""
          onError={() => setFailed(true)}
        />
      ) : (
        <span style={{ background: token.color }}>
          {token.symbol.slice(0, 1)}
        </span>
      )}
    </span>
  );
};

export default memo(TokenIcon);
