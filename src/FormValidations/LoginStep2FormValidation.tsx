import {
  LoginStep2FormProps,
  LoginStep2FormValidationProps,
} from "../Pages/Auth/Login/LoginStep2/LoginStep2Component";

export default function LoginStep2FormValidation(
  password: string
): ReadonlyArray<LoginStep2FormValidationProps> {
  const results: ReadonlyArray<LoginStep2FormValidationProps> = [
    {
      inputName: "password",
      status: true,
      errorMessage: "",
    },
  ];
  if (password == null || password == undefined || password.trim() == "") {
    results.map((item) => {
      if (item.inputName == "password") {
        item.status = false;
        item.errorMessage = "Please enter a valid password";
      }
    });
  }
  return results;
}
