import axios from "axios";
import { redirect } from "react-router-dom";

const RegisterAction = async (props: any) => {
  const receivedFormData = await props.request.formData();
  const formDataToJSON: any = {};
  for (const [key, value] of [...receivedFormData.entries()]) {
    formDataToJSON[key] = value;
  }
  let apiResponseStatus = 0;
  let apiResponseErrorMessage = "";
  await axios
    .post("http://localhost:3002/auth/registerNewUser", formDataToJSON, {
      withCredentials: true,
    })
    .then((response: any) => {
      apiResponseStatus = response.status;
    })
    .catch((error) => {
      console.log(error);
      apiResponseErrorMessage =
        typeof error.response.data.message === "string"
          ? error.response.data.message
          : error.response.data.message[0];
    });
  return apiResponseStatus === 201
    ? redirect(`/`)
    : {
        apiResponseErrorMessage,
        ms: new Date().getMilliseconds() * Math.random() * 1000,
      };
};
export default RegisterAction;
