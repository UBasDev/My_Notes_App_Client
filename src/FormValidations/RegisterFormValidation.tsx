import configs from "../Components/configs";
import { RegisterFormValidationProps } from "../Pages/Register/Register";

export default function RegisterFormValidation(
  email: string,
  username: string,
  password: string
): RegisterFormValidationProps {
  let results: RegisterFormValidationProps = {
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
  };
  const emailRegexp: RegExp = configs.emailRegexp();
  if (!email.match(emailRegexp)) {
    results.email.status = false;
    results.email.errorMessage = "Please enter a valid email address";
  }
  if (username == null || username == "") {
    results.username.status = false;
    results.username.errorMessage = "Please enter a valid username";
  }
  if (password == null || password == "") {
    results.password.status = false;
    results.password.errorMessage = "Please enter a valid password";
  }
  return results;
}
