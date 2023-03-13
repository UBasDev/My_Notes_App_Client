import { AccountCircle } from "@mui/icons-material";
import {
  FilledInput,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";

const text1 = <h3>Find your email</h3>;
const text2 = <h4>Enter your recovery email</h4>;
const text3 = "Email adress";

const ForgetPasswordComponent = (props: any): JSX.Element => {
  return (
    <div>
      {text1}
      {text2}
      <Grid container rowSpacing={6}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
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
        <Grid item xs={1}></Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </div>
  );
};
export default ForgetPasswordComponent;
