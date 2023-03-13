import { useRouteError } from "react-router-dom";

const CommonErrorComponent = (props:any): JSX.Element =>{
    const error:any = useRouteError();
    console.error(error);
    return (
        <div>
            <p>CommonError works!</p>
            <p>{error.statusText || error.message}</p>
        </div>
    )
  }
  export default CommonErrorComponent