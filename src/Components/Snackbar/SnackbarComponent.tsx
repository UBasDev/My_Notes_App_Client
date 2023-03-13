import { Slide, SlideProps, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { disableSnackbar } from "../../Store/Snackbar/SnackbarState";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

const SnackbarComponent = (props: any): JSX.Element => {
  const { isSnackbarVisible, snackbarContent } = useSelector(
    (state: any) => state.snackbarState
  );
  if (isSnackbarVisible) console.log("SNACKVAR VİSİBLE!");
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(disableSnackbar());
  };
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={3000}
      open={isSnackbarVisible}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
      message={snackbarContent || ""}
      key={SlideTransition.name}
    />
  );
};
export default SnackbarComponent;
