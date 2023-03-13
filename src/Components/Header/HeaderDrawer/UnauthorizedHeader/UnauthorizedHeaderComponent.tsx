import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import "./UnauthorizedHeaderDrawerComponent.css";

interface ItemProps {
  key: number;
  value: string;
  icon: JSX.Element;
  link: string;
}

const unAuthorizedNavItems1: ReadonlyArray<ItemProps> = [
  {
    key: 0,
    value: "Github",
    icon: (
      <GitHubIcon
        className="UnauthorizedHeaderDrawerComponentIcon"
        sx={{ color: "black" }}
      />
    ),
    link: "https://github.com/UCB52",
  },
  {
    key: 1,
    value: "LinkedIn",
    icon: (
      <LinkedInIcon
        color="primary"
        className="UnauthorizedHeaderDrawerComponentIcon"
      />
    ),
    link: "https://www.linkedin.com/in/u%C4%9Furcan-ba%C5%9F-84b91a206/",
  },
  {
    key: 2,
    value: "İnstagram",
    icon: (
      <InstagramIcon
        color="error"
        className="UnauthorizedHeaderDrawerComponentIcon"
      />
    ),
    link: "https://instagram.com/ugurcanbas_?igshid=ZDdkNTZiNTM=",
  },
];

const UnauthorizedHeaderDrawerComponent = (props: any): JSX.Element => {
  const goToLinks = (link: string): void => {
    window.open(link);
  };
  return (
    <div>
      <Box sx={{ textAlign: "center" }}>
        <h3>Welcome XXX</h3>
      </Box>
      <Divider />
      <List>
        {unAuthorizedNavItems1.map((item, index) => (
          <ListItem
            className="UnauthorizedHeaderDrawerComponentListContainer"
            onClick={() => goToLinks(item.link)}
            key={item.key}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.value} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );
};
export default UnauthorizedHeaderDrawerComponent;
