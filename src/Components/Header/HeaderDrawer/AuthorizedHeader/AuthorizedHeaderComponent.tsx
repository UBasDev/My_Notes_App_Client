import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import utils from "../../../../utils";
import { useEffect, useState } from "react";

interface ItemProps {
  key: number;
  value: string;
  icon: JSX.Element;
}

const authorizedNavItems1: ReadonlyArray<ItemProps> = [
  {
    key: 0,
    value: "Notes",
    icon: <InboxIcon />,
  },
  {
    key: 1,
    value: "Reminders",
    icon: <MailIcon />,
  },
];

const authorizedNavItems2: ReadonlyArray<ItemProps> = [
  {
    key: 0,
    value: "Trash",
    icon: <InboxIcon />,
  },
];

const AuthorizedHeaderDrawerComponent = (props: any): JSX.Element => {
  const [loggedInUserEmail, setLoggedInUserEmail] = useState<string>("");
  useEffect(() => {
    setLoggedInUserEmail(utils.getCurrentUserEmail());
  }, []);
  return (
    <div>
      <Box sx={{ textAlign: "center" }}>
        <h4>Welcome {loggedInUserEmail || ""}</h4>
      </Box>
      <Divider />
      <List>
        {authorizedNavItems1.map((item, index) => (
          <ListItem key={item.key} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.value} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {authorizedNavItems2.map((item) => (
          <ListItem key={item.key} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.value} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
export default AuthorizedHeaderDrawerComponent;
