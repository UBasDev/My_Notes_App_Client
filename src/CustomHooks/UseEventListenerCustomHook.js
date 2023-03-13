import { useRef } from "react";
import { useEffect } from "react";

export default function UseEventListenerCustomHook(
  eventType,
  callback,
  element = window
) {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  useEffect(() => {
    if (element == null) return;
    const handler = (e) => callbackRef.current(e);
    element.addEventListener(eventType, handler);
    return () => element.removeEventListener(eventType, handler);
  }, [eventType, element]);
}
