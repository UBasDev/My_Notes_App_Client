import { Box, CircularProgress } from "@mui/material";
import "./SpinnerComponent.css";

const SpinnerComponent = (props: any): JSX.Element => {
  return (
    <Box className="SpinnerComponentWraperBox">
      <CircularProgress
        size={60}
        thickness={5}
        className="SpinnerComponentSpinner"
      />
    </Box>
  );
};
export default SpinnerComponent;
