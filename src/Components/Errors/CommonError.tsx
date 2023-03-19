import { Button } from "@mui/material";
import { useRouteError } from "react-router-dom";

const CommonErrorComponent = (props: any): JSX.Element => {
  const error: any = useRouteError();
  console.error(error);
  const goBackHome = () => {
    window.location.replace("/");
  };
  return (
    <div>
      <h3>An error occurred which i couldn't handle. I'm sorry for that.</h3>
      <p>{error.statusText || null}</p>
      <p>{error.message || null}</p>
      <Button
        onClick={goBackHome}
        style={{ textTransform: "capitalize" }}
        variant="contained"
      >
        Please go back to homepage
      </Button>
    </div>
  );
};
export default CommonErrorComponent;
