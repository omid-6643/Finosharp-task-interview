import { useState } from "react";
import { ChartCandle } from "./components/chart";
import Navbar from "./components/navbar";
import { ToggleGroup, ToggleGroupItem } from "./components/ui/toggle-group";
import { cn } from "./lib/utils";

function App() {
  const [value, setValue] = useState(false);
  const [interval, setInterval] = useState("1m");

  return (
    <div
      className={cn("min-h-screen", {
        "bg-black": value,
      })}
    >
      <Navbar value={value} onChangeValue={setValue} />
      <div
        className={cn(
          "p-8 flex flex-col md:flex-row gap-6 items-start flex-wrap md:items-center",
          {
            "text-white ": value,
          }
        )}
      >
        <p>Change interval time : </p>
        <ToggleGroup
          type="single"
          value={interval}
          onValueChange={(value: string) => setInterval(value)}
          className="flex flex-row flex-wrap"
        >
          <ToggleGroupItem value="1m">1m</ToggleGroupItem>
          <ToggleGroupItem value="3m">3m</ToggleGroupItem>
          <ToggleGroupItem value="5m">5m</ToggleGroupItem>
          <ToggleGroupItem value="1h">1H</ToggleGroupItem>
          <ToggleGroupItem value="2h">2H</ToggleGroupItem>
          <ToggleGroupItem value="4h">4H</ToggleGroupItem>
          <ToggleGroupItem value="1d">1D</ToggleGroupItem>
          <ToggleGroupItem value="3d">3D</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="p-6">
        <ChartCandle interval={interval} dark={value} />
      </div>
    </div>
  );
}

export default App;
