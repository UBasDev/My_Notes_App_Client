import { useRef, useState } from "react";
import "./SendMeEmailNotificationComponent.css";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { Alert, AlertTitle } from "@mui/material";
import UseEventListenerCustomHook from "../../CustomHooks/UseEventListenerCustomHook";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import PanToolIcon from "@mui/icons-material/PanTool";

export default function SendMeEmailNotificationComponent() {
  const SendMeEmailNotificationComponentWrapper: any = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);
  if (!window.sessionStorage.getItem("welcomeNotification")) {
  }
  const changeMenuState = () => setIsMenuOpen(!isMenuOpen);

  UseEventListenerCustomHook(
    "click",
    () => setIsMenuOpen(!isMenuOpen),
    true,
    document.getElementById("SendMeEmailNotificationComponentWrapper") as any
  );

  return (
    <div id="SendMeEmailNotificationComponentWrapper">
      {isMenuOpen ? (
        <div
          onClick={changeMenuState}
          className="SendMeEmailNotificationComponentWrapper SendMeEmailNotificationComponentEmailIconHover"
        >
          <ContactMailIcon sx={{ fontSize: "3rem" }} color="info" />
        </div>
      ) : (
        <div className="SendMeEmailNotificationComponentWrapper">
          <Alert icon={<PanToolIcon />} variant="filled" severity="info">
            <AlertTitle>Hello stranger!</AlertTitle>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0 0.5rem",
              }}
            >
              <p>If you wanna contact me via email</p>
              <ArrowCircleRightIcon sx={{ fontSize: "2rem", color: "white" }} />
              <a
                className="SendMeEmailNotificationComponentEmailIconHover"
                href="mailto:ugurcanbas52@hotmail.com"
              >
                <ContactMailIcon
                  className="test11"
                  sx={{ fontSize: "2rem", color: "white" }}
                  color="primary"
                />
              </a>
            </div>
          </Alert>
        </div>
      )}
    </div>
  );
}
