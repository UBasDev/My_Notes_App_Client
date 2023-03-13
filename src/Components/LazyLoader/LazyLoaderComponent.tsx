import { Box, LinearProgress } from "@mui/material";
import "./LazyLoaderComponent.css";

const LazyLoaderComponentLinearProgressStyle = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 999,
  height: 10,
};

const LazyLoaderComponent = (props: any): JSX.Element => {
  return (
    <div className="LazyLoaderComponentWrapper">
      <Box className="LazyLoaderComponentBox">
        <LinearProgress sx={{ ...LazyLoaderComponentLinearProgressStyle }} />
      </Box>
    </div>
  );
};
export default LazyLoaderComponent;
