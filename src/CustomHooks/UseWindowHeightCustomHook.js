import { useState } from "react";
import UseEventListenerCustomHook from "./UseEventListenerCustomHook";
export default function UseWindowHeightCustomHook() {
  const [currentPageYOffset, setCurrentPageYOffset] = useState(0);
  UseEventListenerCustomHook("scroll", () => {
    setCurrentPageYOffset(window.scrollY);
  });
  return currentPageYOffset;
}
