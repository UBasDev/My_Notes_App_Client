import axios from "axios";
import { redirect } from "react-router-dom";
import utils from "../../utils";

const LoginStep2Action = async (props: any) => {
  const receivedFormData = await props.request.formData();
  const formDataToJSON: any = {};
  for (const [key, value] of [...receivedFormData.entries()]) {
    formDataToJSON[key] = value;
  }
  let apiResponseStatus = 0;
  let apiResponseErrorMessage = "";
  await axios
    .post("http://localhost:3002/auth/login", formDataToJSON, {
      withCredentials: true,
    })
    .then((response) => {
      console.log("RESPONSE", response);
      apiResponseStatus = response.status;
    })
    .catch((error) => {
      console.log("CATCH", error);
      apiResponseErrorMessage =
        typeof error.response.data.message === "string"
          ? error.response.data.message
          : error.response.data.message[0];
    });
  return apiResponseStatus === 201
    ? redirect(`/`)
    : {
        apiResponseErrorMessage,
        ms: utils.getTotalMillisecondsUntilNow(),
      };
};
export default LoginStep2Action;
