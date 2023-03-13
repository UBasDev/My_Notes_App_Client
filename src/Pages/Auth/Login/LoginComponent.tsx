import { AccountCircle } from "@mui/icons-material";
import {
  Button,
  FilledInput,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { NavLink } from "react-router-dom";

const text1 = <h3>Sign in</h3>;
const text2 = <h4>Use your account</h4>;
const text3 = "Email or Username";
const text5 = "Create account";
const text6 = "Next";

const LoginComponent = (props: any): JSX.Element => {
  return (
    <>
      {text1}
      {text2}
      <Grid container rowSpacing={6}>
        <Grid item xs={12}>
          <FormControl sx={{ width: "100%" }} variant="filled">
            <InputLabel
              sx={{ fontSize: "medium" }}
              htmlFor="filled-adornment-password"
            >
              {text3}
            </InputLabel>
            <FilledInput
              sx={{ fontSize: "medium" }}
              placeholder="xyz@hotmail.com"
              fullWidth
              color="primary"
              id="filled-adornment-password"
              type={"email"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    <AccountCircle />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <NavLink to={"/auth/register"}>
              <Button
                style={{
                  textTransform: "capitalize",
                }}
                variant="contained"
              >
                {text5}
              </Button>
            </NavLink>
            <Button style={{ textTransform: "capitalize" }} variant="contained">
              {text6}
            </Button>
          </div>
        </Grid>
      </Grid>
    </>
  );
};
export default LoginComponent;
