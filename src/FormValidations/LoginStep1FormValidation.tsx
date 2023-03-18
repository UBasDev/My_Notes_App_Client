import { LoginStep1ComponentFormValidationProps } from "../Pages/Auth/Login/LoginStep1/LoginStep1Component";
import { RegisterFormValidationProps } from "../Pages/Register/Register";

export default function LoginStep1FormValidation(
  usernameOrEmail: string
): ReadonlyArray<LoginStep1ComponentFormValidationProps> {
  const results: ReadonlyArray<LoginStep1ComponentFormValidationProps> = [
    {
      inputName: "usernameOrEmail",
      status: true,
      errorMessage: "",
    },
  ];
  /*
  const passwordRegExp:RegExp =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  */
  if (
    usernameOrEmail == null ||
    usernameOrEmail == undefined ||
    usernameOrEmail.trim() == ""
  ) {
    results.map((item) => {
      if (item.inputName == "usernameOrEmail") {
        item.status = false;
        item.errorMessage = "Please enter a valid username or email";
      }
    });
  }
  return results;
}
