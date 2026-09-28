import { useQuery } from "@tanstack/react-query";
import { FALLBACK } from "../constants/common";
import { normalizePrices } from "../helpers/price";
import { fetchPrices } from "../services/priceService";

export function usePrices() {
  const { data: prices = FALLBACK, isSuccess } = useQuery({
    queryKey: ["prices"],
    queryFn: fetchPrices,
    select: normalizePrices,
  });

  return { prices, live: isSuccess };
}
