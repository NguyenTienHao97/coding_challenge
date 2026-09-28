import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TOKENS } from "../constants/token";
import {
  PriceValue,
  getRate,
  getUsdValue,
  sanitizeAmountInput,
} from "../helpers/price";
import { IToken } from "../types";

export function useSwapForm(prices: PriceValue) {
  const [from, setFrom] = useState<IToken>(TOKENS[0]);
  const [to, setTo] = useState<IToken>(TOKENS[1]);
  const [amount, setAmount] = useState("1");
  const [touched, setTouched] = useState(false);
  const [connected, setConnected] = useState(false);
  const [notice, setNotice] = useState("");
  const [noticeTone, setNoticeTone] = useState<"info" | "error" | "success">(
    "info",
  );
  const [submitting, setSubmitting] = useState(false);
  const aliveRef = useRef(true);

  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
    };
  }, []);

  const amountNumber = Number(amount);
  const amountError = useMemo(() => {
    if (amount.trim() === "") return "Enter an amount to continue.";
    if (!Number.isFinite(amountNumber) || amountNumber <= 0)
      return "Amount must be greater than zero.";
    return "";
  }, [amount, amountNumber]);
  const valid = !amountError;

  const rate = useMemo(() => getRate(prices, from, to), [prices, from, to]);
  const pairError = useMemo(
    () =>
      valid && !rate ? "No quote is available for this pair right now." : "",
    [valid, rate],
  );
  const output = useMemo(
    () => (valid && rate ? amountNumber * rate : 0),
    [amountNumber, rate, valid],
  );
  const usd = useMemo(
    () => getUsdValue(amountNumber, prices[from.symbol] || 0),
    [amountNumber, from.symbol, prices],
  );
  const receiveUsd = useMemo(
    () => output * (prices[to.symbol] || 0),
    [output, prices, to.symbol],
  );

  const showError = useCallback((message: string) => {
    setNotice(message);
    setNoticeTone("error");
  }, []);

  const showSuccess = useCallback((message: string) => {
    setNotice(message);
    setNoticeTone("success");
  }, []);

  const clearNotice = useCallback(() => {
    setNotice("");
    setNoticeTone("info");
  }, []);

  const swapTokens = useCallback(() => {
    setFrom(to);
    setTo(from);
    clearNotice();
  }, [from, to, clearNotice]);

  const handleAmountChange = useCallback(
    (value: string) => {
      setAmount(sanitizeAmountInput(value));
      setTouched(true);
      clearNotice();
    },
    [clearNotice],
  );

  const handleAmountBlur = useCallback(() => {
    setTouched(true);
  }, []);

  const toggleConnected = useCallback(() => {
    setConnected((previous) => !previous);
    clearNotice();
  }, [clearNotice]);

  const resetForm = useCallback(() => {
    setFrom(TOKENS[0]);
    setTo(TOKENS[1]);
    setAmount("1");
    setTouched(false);
  }, []);

  const submit = useCallback(() => {
    setTouched(true);

    if (amountError) {
      showError(amountError);
      return;
    }
    if (pairError) {
      showError(pairError);
      return;
    }
    if (!connected) {
      showError("Connect a wallet to swap tokens.");
      return;
    }

    setSubmitting(true);
    clearNotice();

    setTimeout(() => {
      if (!aliveRef.current) return;

      setSubmitting(false);
      showSuccess("Swap tokens success!");
      resetForm();

      setTimeout(() => {
        if (!aliveRef.current) return;
        clearNotice();
      }, 2500);
    }, 2000);
  }, [
    amountError,
    pairError,
    connected,
    showError,
    showSuccess,
    clearNotice,
    resetForm,
  ]);

  const submitLabel = submitting
    ? "Swapping..."
    : !valid
      ? "Enter an amount"
      : connected
        ? "Swap tokens"
        : "Connect wallet";

  return {
    from,
    to,
    amount,
    touched,
    connected,
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
    setConnected,
    toggleConnected,
    swapTokens,
    handleAmountChange,
    handleAmountBlur,
    submit,
  };
}

export type SwapForm = ReturnType<typeof useSwapForm>;
