import "./HomepageComponent.css";
import { useEffect } from "react";
import configs from "../../Components/configs";
import { Grid } from "@mui/material";
import useWindowSizeCustomHook from "../../CustomHooks/UseWindowSizeCustomHook";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";

const HomepageComponent = (props: any): JSX.Element => {
  const { width } = useWindowSizeCustomHook();
  /** REMOVE SESSION VALUE LIKE GARBAGE COLLECTOR */
  useEffect(() => {
    if (
      window.sessionStorage.getItem(
        configs.LoginStep1ComponentSessionStorageKey
      )
    )
      window.sessionStorage.removeItem(
        configs.LoginStep1ComponentSessionStorageKey
      );
  }, []);
  return (
    <Grid container rowGap={6}>
      <Grid
        className="HomepageComponentMainContainer"
        item
        xs={12}
        sx={{
          minHeight: width > 1024 ? "35rem" : "33rem",
        }}
      >
        <Grid
          container
          justifyContent={"center"}
          alignContent={width > 1024 ? "stretch" : "flex-start"}
          sx={{ height: "100%" }}
        >
          <Grid alignSelf={"flex-start"} item xs={12}>
            <h2 className="HomepageComponentMainText">UCB NOTES</h2>
          </Grid>
          <Grid
            item
            xs={10}
            lg={2}
            alignSelf={width > 1024 ? "center" : "flex-start"}
          >
            <h1 className="HomepageComponentMainText2">
              Record your thoughts, wherever you are
            </h1>
          </Grid>
          <Grid item xs={0} lg={4}></Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent={"center"} rowGap={3}>
          <Grid item xs={12} style={{ padding: "0 2rem" }}>
            <h2 className="HomepageComponentSecondaryTexts">
              Record what's on your mind
            </h2>
          </Grid>
          <Grid item xs={12} style={{ padding: "0 2rem" }}>
            <h2 className="HomepageComponentSecondaryTexts">
              Add notes, lists, photos and sounds to UCB Notes.
            </h2>
          </Grid>
          <Grid item xs={12} style={{ padding: "0 2rem" }}>
            <Grid container justifyContent={"center"} columnGap={2}>
              <Grid item xs={6} lg={3}>
                <div className="HomepageComponentItemsContainers">
                  <img
                    className="HomepageComponentItemContainerImages"
                    src={"/images/homepageImages/note1.jpg"}
                    height="250px"
                    width={"100%"}
                    alt="note1"
                  />
                  <p>
                    <TextSnippetIcon className="HomepageComponentItemContainerIcons" />
                  </p>
                </div>
              </Grid>
              <Grid item xs={6} lg={3}>
                <div className="HomepageComponentItemsContainers">
                  <img
                    className="HomepageComponentItemContainerImages"
                    src={"/images/homepageImages/note2.jpg"}
                    height="250px"
                    width={"100%"}
                    alt="note2"
                  />
                  <p>
                    <FormatListBulletedIcon className="HomepageComponentItemContainerIcons" />
                  </p>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ padding: "0 2rem" }}>
            <Grid container justifyContent={"center"} columnGap={2}>
              <Grid item xs={6} lg={3}>
                <div className="HomepageComponentItemsContainers">
                  <img
                    className="HomepageComponentItemContainerImages"
                    src={"/images/homepageImages/note3.jpg"}
                    height="250px"
                    width={"100%"}
                    alt="note3"
                  />
                  <p>
                    <AddAPhotoIcon className="HomepageComponentItemContainerIcons" />
                  </p>
                </div>
              </Grid>
              <Grid item xs={6} lg={3}>
                <div className="HomepageComponentItemsContainers">
                  <img
                    className="HomepageComponentItemContainerImages"
                    src={"/images/homepageImages/note4.jpg"}
                    height="250px"
                    width={"100%"}
                    alt="note4"
                  />
                  <p>
                    <KeyboardVoiceIcon className="HomepageComponentItemContainerIcons" />
                  </p>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default HomepageComponent;
