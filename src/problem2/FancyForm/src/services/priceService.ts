import { PRICE_URL } from "../constants/common";

export async function fetchPrices(): Promise<unknown> {
  const response = await fetch(PRICE_URL);
  if (!response.ok) throw new Error("Price request failed");
  return response.json();
}
