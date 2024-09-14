import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const transformData = (data: (string | number)[][]) => {
  return data.map((item: (string | number)[]) => ({
    open: +item[1],
    high: +item[2],
    low: +item[3],
    close: +item[4],
    time: item[0],
  }));
};

const fetchKlines = async (interval: string) => {
  const response = await axios.get(
    `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=${interval}&limit=100`
  );
  return transformData(response.data);
};

const useKlines = (interval: string) => {
  return useQuery({
    queryKey: ["klines", interval],
    queryFn: () => fetchKlines(interval),
    retry: 60000,
  });
};

export default useKlines;
