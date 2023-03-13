import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";

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
  {
    key: 2,
    value: "Trash",
    icon: <InboxIcon />,
  },
];

const AuthorizedHeaderDrawerComponent = (props: any): JSX.Element => {
  return (
    <div>
      <Toolbar />
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
    </div>
  );
};
export default AuthorizedHeaderDrawerComponent;
