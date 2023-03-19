import { useEffect, useState } from "react";
import utils from "../../../../utils";
import configs from "../../../../Components/configs";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./LoginStep2Component.css";
import { Form, NavLink, useActionData, useNavigate } from "react-router-dom";
import {
  Button,
  FilledInput,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { enableSnackbar } from "../../../../Store/Snackbar/SnackbarState";
import LoginStep2FormValidation from "../../../../FormValidations/LoginStep2FormValidation";

interface SessionStorageProps {
  usernameOrEmail: string;
}

export interface LoginStep2FormValidationProps {
  inputName: string;
  status: boolean;
  errorMessage: string;
}

export interface LoginStep2FormProps {
  password: string;
}

const text1 = "Password";
const text2 = "Forgot password?";
const text3 = "Login";
const text4 = "Sorry, i don't have email provider yet";

const LoginStep2Component = (props: any): JSX.Element => {
  const [formValidation, setFormValidation] = useState<
    ReadonlyArray<LoginStep2FormValidationProps>
  >([
    {
      inputName: "password",
      status: true,
      errorMessage: "",
    },
  ]);

  /** API RESPONSE ERROR MESSAGE */
  const { apiResponseErrorMessage, ms }: any = useActionData() || {};
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [emailReceivedFromLoginStep1, setEmailReceivedFromLoginStep1] =
    useState<string>("");

  /** RECEIVE STATE PROPS FROM LoginStep1Component */
  useEffect(() => {
    const emailFromLoginStep1: SessionStorageProps =
      utils.getHashedValueFromSessionStorageAndConvertToString(
        configs.LoginStep1ComponentSessionStorageKey
      );
    if (!emailFromLoginStep1)
      navigate("/auth/login_step1", {
        replace: true,
        state: {
          from: window.location.pathname,
          state_data: {
            emailFromLoginStep2: emailReceivedFromLoginStep1,
          },
        },
      });
    else setEmailReceivedFromLoginStep1(emailFromLoginStep1.usernameOrEmail);
  }, []);
  /** FORM VALIDATION */
  const validateFormBeforeSubmit = (event: any) => {
    //    event.preventDefault();
    const formData = new FormData(event.target);
    const formObject: LoginStep2FormProps = Object.fromEntries(formData) as any;
    const results: ReadonlyArray<LoginStep2FormValidationProps> =
      LoginStep2FormValidation(formObject.password);
    setFormValidation(results);
    for (let i: number = 0; i < results.length; i++) {
      if (results[i].status == false) {
        event.preventDefault();
        break;
      }
    }
  };
  /** PASSWORD TEXT INPUT */
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  /** CATCH ERROR MESSAGE FROM ACTION */
  useEffect(() => {
    if (apiResponseErrorMessage)
      dispatch(enableSnackbar(apiResponseErrorMessage));
  }, [ms, apiResponseErrorMessage, dispatch]);

  const onForgotPasswordClick = () => {
    dispatch(enableSnackbar(text4));
  };
  return (
    <div className="LoginStep2ComponentWrapper">
      <h4 style={{ textAlign: "center" }}>Welcome</h4>
      <NavLink
        to={"/auth/login_step1"}
        state={{
          from: window.location.pathname,
          data: emailReceivedFromLoginStep1 || "",
        }}
        replace={true}
        style={{ color: "black" }}
      >
        <div className="LoginStep2ComponentEmailReceived" style={{}}>
          <AccountCircleIcon />
          <span>{emailReceivedFromLoginStep1}</span>
          <KeyboardArrowDownIcon />
        </div>
      </NavLink>
      <Form
        method="post"
        action="/auth/login_step2"
        onSubmit={validateFormBeforeSubmit}
      >
        <input
          value={emailReceivedFromLoginStep1}
          onChange={() => void 0}
          name="usernameOrEmail"
          hidden
        />
        <Grid
          container
          justifyContent={"center"}
          rowSpacing={6}
          columnSpacing={2}
          sx={{ paddingTop: "3rem", paddingBottom: "2rem" }}
        >
          <Grid item xs={12}>
            <FormControl sx={{ width: "100%" }} variant="filled">
              <InputLabel
                sx={{ fontSize: "medium" }}
                htmlFor="register_component_password_input"
              >
                {text1}
              </InputLabel>
              <FilledInput
                autoFocus
                name="password"
                sx={{ fontSize: "medium" }}
                placeholder="Must be strong"
                fullWidth
                color="primary"
                id="register_component_password_input"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      tabIndex={-1}
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label="toggle password visibility"
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOff tabIndex={-1} />
                      ) : (
                        <Visibility tabIndex={-1} />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {/* {renderPasswordErrorMessage()} */}
            </FormControl>
            {formValidation.map((item) =>
              item.inputName == "password" && item.status == false ? (
                <p className="LoginStep2ComponentErrorMessages">
                  {item.errorMessage}
                </p>
              ) : null
            )}
          </Grid>
          <Grid item xs={12}>
            <div className="LoginStep2ComponentBottomOfFormContainer">
              <Button
                onClick={onForgotPasswordClick}
                type="button"
                style={{ textTransform: "capitalize" }}
                variant="contained"
              >
                {text2}
              </Button>
              <Button
                type="submit"
                style={{ textTransform: "capitalize" }}
                variant="contained"
              >
                {text3}
              </Button>
            </div>
          </Grid>
        </Grid>
      </Form>
    </div>
  );
};
export default LoginStep2Component;
