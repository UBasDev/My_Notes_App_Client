import { Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./ScrollToTopComponent.css";

interface ScrollToTopComponentProps {
  currentWindowHeight: number;
}

const ScrollToTopComponent = (
  props: ScrollToTopComponentProps
): JSX.Element => {
  const scrollToTopSmooothly = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div
      className="ScrollToTopComponentWrapper"
      style={{
        display: props.currentWindowHeight > 300 ? "block" : "none",
      }}
    >
      <Fab
        className="ScrollToTopComponentIconWrapper"
        onClick={scrollToTopSmooothly}
        size="small"
        aria-label="scroll back to top"
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </div>
  );
};
export default ScrollToTopComponent;
