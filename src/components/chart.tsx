import { ColorType, createChart } from "lightweight-charts";
import { useEffect, useRef } from "react";
import useKlines from "../hooks/useKlines";

export const ChartComponent = (props: any) => {
  const {
    data,
    dark = false,
    colors: {
      backgroundColor = !props.dark ? "white" : "black",
      lineColor = !props.dark ? "#2962FF" : "#c500fc",
      textColor = !props.dark ? "black" : "white",
      areaTopColor = !props.dark ? "#2962FF" : "#c500fc",
      areaBottomColor = !props.dark ? "rgba(41, 98, 255, 0.28)" : "#c500fc",
    } = {},
  } = props;

  const chartContainerRef = useRef<any>();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef?.current?.clientWidth,
      });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      width: chartContainerRef.current?.clientWidth,
      height: 300,
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addCandlestickSeries({
      upColor: !dark ? "#26a69a" : "#2fff00",
      downColor: !dark ? "#ef5350" : "#ff0400",
      borderVisible: false,
      wickUpColor: !dark ? "#26a69a" : "#2fff00",
      wickDownColor: !dark ? "#ef5350" : "#ff0400",
    });
    newSeries.setData(data);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [
    data,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
    dark,
  ]);

  return <div ref={chartContainerRef} />;
};

export function ChartCandle(props: any) {
  const { data, isLoading } = useKlines(props.interval);

  return !isLoading && <ChartComponent {...props} data={data}></ChartComponent>;
}
