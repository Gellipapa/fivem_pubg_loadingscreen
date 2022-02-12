import { Slider } from "./components/Slider/Slider";
import { useNuiEvent } from "react-fivem-hooks";

export default function App() {
  const { data: isOpen } = useNuiEvent({ event: "SET_NUI_OPEN" });
  return (
    <div className="App">
      <Slider />
    </div>
  );
}
