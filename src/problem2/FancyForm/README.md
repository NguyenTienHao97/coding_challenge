# Flux — Currency Swap UI

A responsive React + Vite currency swap form with searchable token selectors, reverse-pair control, amount validation, indicative USD values, slippage settings, wallet-connection state, and a live price-feed attempt.

## Run locally

```bash
npm install
npm run dev
```

Build for production with `npm run build`.

## Price data and icons

The app requests `https://interview.switcheo.com/prices.json`. If the request is unavailable or a token is missing, it uses clearly indicative fallback values so the UI remains usable. Token icons are loaded from the Switcheo token-icons repository.

**Demo note:** Wallet connection and swap submission are UI-only placeholders; no wallet provider or on-chain transaction is connected.
