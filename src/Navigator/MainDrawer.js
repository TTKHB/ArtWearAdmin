import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
//Icon
import MailIcon from "@mui/icons-material/Email";
import Customer from "@mui/icons-material/AssignmentInd";
import AllCustomer from "@mui/icons-material/People";
import Product from "@mui/icons-material/EventNote";
import AllProduct from "@mui/icons-material/Article";
import CreateProduct from "@mui/icons-material/AddCircle";
import UpdateProduct from "@mui/icons-material/Create";
import Category from "@mui/icons-material/GridView";
import AllCategory from "@mui/icons-material/Category";
import MenuIcon from "@mui/icons-material/Menu";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Router, Switch, Route } from "react-router-dom";
import ProductRouter from "./../Router/ProductRouter";
import Link from "@mui/material/Link";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";

import { useHistory } from 'react-router-dom'
import { signOut } from '../pages/auth/User';
import { useLogin } from '../Context/AuthContext';

const drawerWidth = 240;

//sửa đúng cấu trúc để thêm screen to navigate
const data = [
  {
    id: "1",
    icon: <Product color="primary"/>,
    label: "Quản lý sản phẩm",
    data: [
      {
        label: "Tất cả sản phẩm",
        icon: <AllProduct color="primary"/>,
        page: "/MainDrawer/qlsanpham/sanpham",
      },
      {
        label: "Thêm sản phẩm",
        icon: <CreateProduct color="primary"/>,
        page: "/MainDrawer/qlsanpham/addsanpham",
      },
      {
        label: "Cập nhật sản phẩm",
        icon: <UpdateProduct color="primary"/>,
        page: "/MainDrawer/qlsanpham/updatesanpham",
      },
    ],
  },
  {
    id: "2",
    icon: <Category color="primary"/>,
    label: "Loại sản phẩm",
    data: [
      { 
        label: "Tất cả loại sản phẩm", 
        icon: <AllCategory color="primary"/>,
        page: "/MainDrawer/qltheloai/theloai" 
      },
    ],
  },
  {
    id: "3",
    icon: <Customer color="primary" />,
    label: "Người dùng",
    data: [
      { 
        label: "Tất cả người dùng", 
        icon: <AllCustomer color="primary" />,
        page: "/MainDrawer/qltheloai/theloai" 
      },
    ],
  },
];

function MainDrawer(props) {
  const history = useHistory();
  const { setIsLoggedIn, profile } = useLogin();

  const [open, setOpen] = React.useState(
    JSON.parse(localStorage.getItem("LIST_COLLAPSE")) || []
  );
  const [selectedItem, setSelectedItem] = React.useState(
    JSON.parse(localStorage.getItem("LIST_ITEM")) || {}
  );

  const handleCollapse = (id) => {
    console.log("id", id);
    // setOpen(!open);
    setOpen((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };
  const handleSelectedItem = (id, index) => {
    setSelectedItem({
      id: id,
      index: index,
    });
    console.log("id213", selectedItem[id]);
  };

  // save expanded collapse
  React.useEffect(() => {
    localStorage.setItem("LIST_COLLAPSE", JSON.stringify(open));
  }, [open]);

  // save selected item
  React.useEffect(() => {
    localStorage.setItem("LIST_ITEM", JSON.stringify(selectedItem));
  }, [selectedItem]);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // appbar
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            sx={{ fontWeight: 'bold', fontSize: '18px', color: 'black' }}>
            Cửa hàng ArtWear
          </ListSubheader>
        }
      >
        {/* start item dropdown */}

        {data.map((item, index) => (
          <div key={item.id}>
            <ListItemButton
              disableRipple
              disableTouchRipple
              disableFocusRibble
              onClick={() => handleCollapse(item.id)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography
                    type="body2"
                    style={{ color: "black", fontWeight: "bold" }}
                  >
                    {item.label}
                  </Typography>
                }
              />
              {open[item.id] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Divider />

            {item.data.map((data, index) => (
              <div key={index}>
                <Collapse in={open[item.id]} timeout="auto" unmountOnExit>
                  <List
                    button
                    component="div"
                    disablePadding
                    component={Link}
                    href={data.page}
                    underline="none"
                    color="black"
                  >
                    <ListItemButton
                      onClick={() => handleSelectedItem(item.id, index)}
                      disableRipple
                      disableTouchRipple
                      disableFocusRibble
                      sx={{ pl: 4 }}
                      style={
                        selectedItem.id == item.id &&
                          selectedItem.index == index
                          ? {
                            borderRadius: 10,
                            color: "#007FFF",
                          }
                          : { borderRadius: 10 }
                      }
                    >
                      <ListItemIcon>{data.icon}</ListItemIcon>
                      <ListItemText primary={data.label} />
                    </ListItemButton>
                  </List>
                </Collapse>
              </div>
            ))}
          </div>
        ))}
        {/* end item dropdown */}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>

            <div
            >
              <h1
                onClick={async () => {
                  const isLoggedOut = await signOut()
                  if (isLoggedOut) {
                    setIsLoggedIn(false)
                    history.push('/login')
                  }
                }
                  // setIsLoggedIn(false)
                }
              >logOut</h1>
            </div>

          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
        style={{
          backgroundColor: "rgb(248 248 252)",
        }}
      >
        {/* add router */}
        <Toolbar />
        <ProductRouter />
      </Box>
    </Box>
  );
}

MainDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default MainDrawer;
