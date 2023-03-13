import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import utils from "../../utils";
import { useNavigate } from "react-router-dom";
import HeaderDrawerComponent from "./HeaderDrawer/HeaderDrawerComponent";

const drawerWidth = 240;

interface NavItemProps {
  key: number;
  value: string;
}

const unAuthorizedNavItems: ReadonlyArray<NavItemProps> = [
  {
    key: 0,
    value: "Login",
  },
  {
    key: 1,
    value: "Register",
  },
  {
    key: 2,
    value: "About",
  },
  {
    key: 3,
    value: "Contact",
  },
];
const authorizedNavItems: ReadonlyArray<NavItemProps> = [
  {
    key: 0,
    value: "Profile",
  },
  {
    key: 1,
    value: "MyNotes",
  },
];

const HeaderComponent = (props: any): JSX.Element => {
  const navigate = useNavigate();
  const [choosedNavItems, setChoosedNavItems] = useState<
    ReadonlyArray<NavItemProps>
  >([]);
  const isUserLoggedIn = utils.getCurrentUserInfoFromCookie();
  const chooseNavItemsIfUserLoggedIn = () => {
    setChoosedNavItems(
      isUserLoggedIn ? authorizedNavItems : unAuthorizedNavItems
    );
  };

  const [mobileOpen, setMobileOpen] = useState(true);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    console.log("MOBILE OPEN", mobileOpen);
  };
  useEffect(() => {
    chooseNavItemsIfUserLoggedIn();
  });
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        position="fixed"
        sx={{
          width: { sm: mobileOpen ? `calc(100% - ${drawerWidth}px)` : "100%" },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <span className="HeaderComponentIcon" onClick={() => navigate("/")}>
              UCB NOTES
            </span>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {choosedNavItems.map((item) => (
              <Button
                onClick={() => {
                  if (item.value == "Login") navigate("/auth/login");
                  else if (item.value == "Register") navigate("/auth/register");
                }}
                key={item.key}
                sx={{ color: "#fff" }}
              >
                {item.value}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <header>
        <nav>
          <Box
            component="nav"
            sx={{
              width: { sm: mobileOpen ? drawerWidth : 0 },
              flexShrink: { sm: 0 },
            }}
            aria-label="mailbox folders"
          >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
              //container={container}
              variant="temporary"
              open={!mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              {<HeaderDrawerComponent isUserLoggedIn={isUserLoggedIn} />}
            </Drawer>
            <Drawer
              variant="persistent"
              sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {<HeaderDrawerComponent />}
            </Drawer>
          </Box>
        </nav>
      </header>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: mobileOpen ? `calc(100% - ${drawerWidth}px)` : "100%" },
        }}
      >
        <Toolbar />
        <main>
          <Typography paragraph>{props.children}</Typography>
        </main>
      </Box>
    </Box>
  );
};
export default HeaderComponent;
