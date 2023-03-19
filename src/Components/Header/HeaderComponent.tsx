import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
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
  {
    key: 2,
    value: "Logout",
  },
];

const HeaderComponent = (props: any): JSX.Element => {
  const navigate = useNavigate();
  const [choosedNavItems, setChoosedNavItems] = useState<
    ReadonlyArray<NavItemProps>
  >([]);

  const chooseNavItemsIfUserLoggedIn = () => {
    const isUserLoggedIn: boolean = utils.getCurrentUserTokenFromCookie()
      ? true
      : false;
    setChoosedNavItems(
      isUserLoggedIn ? authorizedNavItems : unAuthorizedNavItems
    );
  };

  useEffect(() => {
    chooseNavItemsIfUserLoggedIn();
  }, []);

  const [mobileOpen, setMobileOpen] = useState(true);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const onNavItemClick = (item: NavItemProps) => {
    if (item.value == "Login") navigate("/auth/login_step1");
    else if (item.value == "Register") navigate("/auth/register");
    else if (item.value == "Logout") {
      utils.clearAllCookies();
      window.sessionStorage.clear();
      window.localStorage.clear();
      window.location.assign("/");
    }
  };
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
          {/* <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", lg: "block" } }}
          >
            <span className="HeaderComponentIcon" onClick={() => navigate("/")}>
              UCB NOTES
            </span>
          </Typography> */}
          <Box
            sx={{
              display: {
                xs: "block",
                textAlign: "end",
                flexGrow: 1,
              },
            }}
          >
            {choosedNavItems.map((item) => (
              <Button
                onClick={() => onNavItemClick(item)}
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
                keepMounted: true, // Better open performance on mobile
                disableScrollLock: true,
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              {<HeaderDrawerComponent />}
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
          width: { sm: mobileOpen ? `calc(100% - ${drawerWidth}px)` : "100%" },
        }}
      >
        <Toolbar />
        <main>{props.children}</main>
      </Box>
    </Box>
  );
};
export default HeaderComponent;
