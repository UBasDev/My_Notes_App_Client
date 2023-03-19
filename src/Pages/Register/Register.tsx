import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FilledInput,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Form, NavLink, useActionData } from "react-router-dom";
import { useDispatch } from "react-redux";
import { enableSnackbar } from "../../Store/Snackbar/SnackbarState";
import RegisterFormValidation from "../../FormValidations/RegisterFormValidation";
import "./Register.css";

interface FormItemProps {
  index: number;
  gridWidth: number;
  htmlFor: string;
  text: string;
  inputName: string;
  placeholder: string;
  id: string;
  inputType: string;
}

interface GenderFormInputProps {
  key: string;
  value: string;
}

interface RegisterFormProps {
  email: string;
  password: string;
  username: string;
  gender?: string;
  name?: string;
  lastname?: string;
}

interface MinorRegisterFormValidationProps {
  status: boolean;
  errorMessage: string;
}

export interface RegisterFormValidationProps {
  email: MinorRegisterFormValidationProps;
  username: MinorRegisterFormValidationProps;
  password: MinorRegisterFormValidationProps;
}

const text1 = <h1>Create your UCB NOTES Account</h1>;

const text6 = "Next";
const text7 = "Password";
const text8 = "Sign in instead";

const genderSelectItems: ReadonlyArray<GenderFormInputProps> = [
  {
    key: "Male",
    value: "Male",
  },
  {
    key: "Female",
    value: "Female",
  },
  {
    key: "Other",
    value: "Other",
  },
];

const formItems: ReadonlyArray<FormItemProps> = [
  {
    index: 0,
    gridWidth: 12,
    htmlFor: "register_component_email_input",
    text: "Email",
    inputName: "email",
    placeholder: "xyz@hotmail.com",
    id: "register_component_email_input",
    inputType: "email",
  },
  {
    index: 1,
    gridWidth: 12,
    htmlFor: "register_component_username_input",
    text: "Username",
    inputName: "username",
    placeholder: "Must be unique",
    id: "register_component_username_input",
    inputType: "text",
  },
  {
    index: 2,
    gridWidth: 6,
    htmlFor: "register_component_name_input",
    text: "Name",
    inputName: "name",
    placeholder: "John",
    id: "register_component_name_input",
    inputType: "text",
  },
  {
    index: 3,
    gridWidth: 6,
    htmlFor: "register_component_lastname_input",
    text: "Lastname",
    inputName: "lastname",
    placeholder: "Doe",
    id: "register_component_lastname_input",
    inputType: "text",
  },
];

const RegisterComponent = (props: any): JSX.Element => {
  /** FORM VALIDATION */
  const [formValidation, setFormValidation] =
    useState<RegisterFormValidationProps>({
      email: {
        status: true,
        errorMessage: "",
      },
      username: {
        status: true,
        errorMessage: "",
      },
      password: {
        status: true,
        errorMessage: "",
      },
    });

  /** API RESPONSE ERROR MESSAGE */
  const { apiResponseErrorMessage, ms }: any = useActionData() || {};
  const dispatch = useDispatch();

  /** GENDER SELECT INPUT */
  const [genderSelectItem, setGenderSelectItem] = useState<string>("");
  const handleChange = (event: any) => {
    setGenderSelectItem(event.target.value);
  };

  /** PASSWORD TEXT INPUT */
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const renderErrorMessages = (inputName: string): JSX.Element | undefined => {
    if (inputName == "email") {
      return (
        <b
          className="RegisterComponentErrorMessages"
          style={{
            display: formValidation.email.status == false ? "block" : "none",
          }}
        >
          {formValidation.email.errorMessage}
        </b>
      );
    } else if (inputName == "username") {
      return (
        <b
          style={{
            display: formValidation.username.status == false ? "block" : "none",
          }}
          className="RegisterComponentErrorMessages"
        >
          {formValidation.username.errorMessage}
        </b>
      );
    }
  };
  const renderPasswordErrorMessage = () => {
    return (
      <b
        style={{
          display: formValidation.password.status == false ? "block" : "none",
        }}
        className="RegisterComponentErrorMessages"
      >
        {formValidation.password.errorMessage}
      </b>
    );
  };
  useEffect(() => {
    if (apiResponseErrorMessage)
      dispatch(enableSnackbar(apiResponseErrorMessage));
  }, [ms]);
  const validateFormBeforeSubmit = (event: any) => {
    const formData = new FormData(event.target);
    const formValues: RegisterFormProps = Object.fromEntries(formData) as any;
    const validationResults: RegisterFormValidationProps =
      RegisterFormValidation(
        formValues.email,
        formValues.username,
        formValues.password
      );
    console.log("VALİDATİON RESULT", validationResults);
    if (
      !validationResults.email.status ||
      !validationResults.username.status ||
      !validationResults.password.status
    ) {
      setFormValidation(validationResults);
      event.preventDefault();
    }
  };
  return (
    <div className="RegisterComponentWrapper">
      {text1}
      <Form
        method="post"
        action="/auth/register"
        onSubmit={validateFormBeforeSubmit}
      >
        <Grid container rowSpacing={3} columnSpacing={2}>
          {formItems.map((formItem, index) => (
            <Grid key={formItem.index} item xs={formItem.gridWidth}>
              <FormControl sx={{ width: "100%" }} variant="filled">
                <InputLabel
                  sx={{ fontSize: "medium" }}
                  htmlFor={formItem.htmlFor}
                >
                  {formItem.text}
                </InputLabel>
                <FilledInput
                  name={formItem.inputName}
                  sx={{ fontSize: "medium" }}
                  placeholder={formItem.placeholder}
                  fullWidth
                  color="primary"
                  id={formItem.id}
                  type={formItem.inputType}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton tabIndex={-1} edge="end">
                        <AccountCircle tabIndex={-1} />
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {renderErrorMessages(formItem.inputName)}
              </FormControl>
            </Grid>
          ))}
          <Grid item xs={6}>
            <FormControl sx={{ width: "100%" }} variant="filled">
              <InputLabel
                sx={{ fontSize: "medium" }}
                htmlFor="register_component_password_input"
              >
                {text7}
              </InputLabel>
              <FilledInput
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
              {renderPasswordErrorMessage()}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="filled" sx={{ width: "100%" }}>
              <InputLabel id="register_component_gender_select">
                Gender
              </InputLabel>
              <Select
                name="gender"
                labelId="register_component_gender_select"
                id="register_component_gender_select"
                value={genderSelectItem}
                onChange={handleChange}
              >
                {genderSelectItems.map((item) => (
                  <MenuItem key={item.key} value={item.key}>
                    {item.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              style={{ textTransform: "capitalize" }}
              variant="contained"
            >
              {text6}
            </Button>
          </Grid>
          <Grid style={{ textAlign: "left" }} item xs={12}>
            <NavLink to={"/auth/login_step1"}>
              <Button
                style={{
                  textTransform: "capitalize",
                }}
                size="small"
                variant="contained"
              >
                {text8}
              </Button>
            </NavLink>
          </Grid>
        </Grid>
      </Form>
    </div>
  );
};
export default RegisterComponent;
