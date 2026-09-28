import { memo } from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <span>© 2026 Swap Tokens</span>
      <span>
        Built for a world in motion <span className="footer-star">✳</span>
      </span>
    </footer>
  );
};

export default memo(Footer);
