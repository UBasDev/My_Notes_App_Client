import axios from "axios";
import { redirect } from "react-router-dom";
import utils from "../../utils";
import configs from "../../Components/configs";

interface SessionStorageProps {
  usernameOrEmail: string;
}

const LoginStep1Action = async (props: any) => {
  const receivedFormData = await props.request.formData();
  const formDataToJSON: any = {};
  for (const [key, value] of [...receivedFormData.entries()]) {
    formDataToJSON[key] = value;
  }

  let apiResponseStatus = 0;
  let apiResponseErrorMessage = "";
  await axios
    .post("http://localhost:3002/auth/isUsernameOrEmailExists", formDataToJSON)
    .then((response) => {
      apiResponseStatus = response.status;
    })
    .catch((error) => {
      console.log("CATCH", error);
      apiResponseErrorMessage =
        typeof error.response.data.message === "string"
          ? error.response.data.message
          : error.response.data.message[0];
    });
  const valueToSaveSessionStorage: SessionStorageProps = {
    usernameOrEmail: formDataToJSON.usernameOrEmail,
  };
  utils.setHashedValueToSessionStorage(
    configs.LoginStep1ComponentSessionStorageKey,
    valueToSaveSessionStorage
  );
  return apiResponseStatus === 201
    ? redirect(`/auth/login_step2`)
    : {
        apiResponseErrorMessage,
        ms: utils.getTotalMillisecondsUntilNow(),
      };
};
export default LoginStep1Action;
