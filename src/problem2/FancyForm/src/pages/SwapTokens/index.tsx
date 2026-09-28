import { Clock3, ShieldCheck, Sparkles } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MarketSnapshot from "../../components/MarketSnapshot";
import SwapCard from "../../components/SwapCard";
import { usePrices } from "../../hooks/usePrices";
import { useSwapForm } from "../../hooks/useSwapForm";

export default function SwapTokens() {
  const { prices, live } = usePrices();
  const swap = useSwapForm(prices);

  return (
    <main className="app-shell">
      <Header
        connected={swap.connected}
        onToggleConnect={swap.toggleConnected}
      />

      <section className="hero">
        <h1>
          <span>Swap Tokens</span>
        </h1>
      </section>

      <section className="swap-layout" id="swap">
        <SwapCard swap={swap} />

        <aside className="side-column">
          <MarketSnapshot
            from={swap.from}
            to={swap.to}
            rate={swap.rate}
            prices={prices}
            live={live}
          />

          <div className="tip-card">
            <div className="tip-icon">
              <Sparkles size={17} />
            </div>
            <div>
              <strong>A little more clarity.</strong>
              <p>
                Your quote updates when you change tokens or amount. Final
                execution price may vary with market conditions.
              </p>
            </div>
          </div>

          <div className="trust-line">
            <span>
              <ShieldCheck size={15} /> Self-custody first
            </span>
            <span>
              <Clock3 size={15} /> Fast, simple swaps
            </span>
          </div>
        </aside>
      </section>

      <Footer />
    </main>
  );
}
