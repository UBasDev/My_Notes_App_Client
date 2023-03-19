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
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Form, NavLink, useActionData, useLocation } from "react-router-dom";
import { enableSnackbar } from "../../../../Store/Snackbar/SnackbarState";
import LoginStep1FormValidation from "../../../../FormValidations/LoginStep1FormValidation";
import "./LoginStep1Component.css";

export interface LoginStep1ComponentFormValidationProps {
  inputName: string;
  status: boolean;
  errorMessage: string;
}

export interface LoginStep1FormSubmitProps {
  usernameOrEmail: string;
}

const text1 = <h3>Sign in</h3>;
const text2 = <h4>Use your account</h4>;
const text3 = "Email or Username";
const text5 = "Create account";
const text6 = "Next";

const LoginStep1Component = (props: any): JSX.Element => {
  const [formValidation, setFormValidation] = useState<
    ReadonlyArray<LoginStep1ComponentFormValidationProps>
  >([
    {
      inputName: "usernameOrEmail",
      status: true,
      errorMessage: "",
    },
  ]);

  const location = useLocation();

  const [defaultEmailValue, setDefaultEmailValue] = useState<string>("");

  /** API RESPONSE ERROR MESSAGE */
  const { apiResponseErrorMessage, ms }: any = useActionData() || {};
  const dispatch = useDispatch();

  const onFormSubmit = (event: any) => {
    const formData = new FormData(event.target);
    const formObject: LoginStep1FormSubmitProps = Object.fromEntries(
      formData
    ) as any;
    const results: ReadonlyArray<LoginStep1ComponentFormValidationProps> =
      LoginStep1FormValidation(formObject.usernameOrEmail);
    setFormValidation(results);
    for (let i: number = 0; i < results.length; i++) {
      if (results[i].status == false) {
        event.preventDefault();
        break;
      }
    }
  };
  /** CATCH ERROR MESSAGE FROM ACTION */
  useEffect(() => {
    if (apiResponseErrorMessage)
      dispatch(enableSnackbar(apiResponseErrorMessage));
  }, [ms, apiResponseErrorMessage, dispatch]);

  useEffect(() => {
    if (location.state?.from == "/auth/login_step2") {
      setDefaultEmailValue(location.state?.data || "");
    }
  }, [location.state]);
  const onInputChange = (event: any) => {
    setDefaultEmailValue(event.target.value);
  };
  return (
    <div className="LoginStep1ComponentWrapper">
      {text1}
      {text2}
      <Form method="post" action="/auth/login_step1" onSubmit={onFormSubmit}>
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
                autoFocus
                onChange={onInputChange}
                value={defaultEmailValue || ""}
                name="usernameOrEmail"
                sx={{ fontSize: "medium" }}
                placeholder="xyz@hotmail.com"
                fullWidth
                color="primary"
                id="filled-adornment-password"
                type={"text"}
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
            {formValidation.map((item, index) =>
              item.status == false ? (
                <p key={index} className="LoginStep1ComponentErrorMessages">
                  {item.errorMessage}
                </p>
              ) : null
            )}
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
              <Button
                type="submit"
                style={{ textTransform: "capitalize" }}
                variant="contained"
              >
                {text6}
              </Button>
            </div>
          </Grid>
        </Grid>
      </Form>
    </div>
  );
};
export default LoginStep1Component;
