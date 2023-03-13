import { useState } from "react";
import UseEventListenerCustomHook from "./UseEventListenerCustomHook";

export default function useWindowSizeCustomHook() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  UseEventListenerCustomHook("resize", () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  });
  return windowSize;
}
