import { AppBar, Box, Typography } from "@mui/material";

import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ClassIcon from "@mui/icons-material/Class";
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const pages = ["new"];

type NavbarProps = {
  appLogged: boolean;
  logoutFunc: () => void;
};

function Navbar({ appLogged, logoutFunc }: NavbarProps) {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [username, setUsername] = useState("");
  const [logged, setLogged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const func = async () => {
      await fetch("https://note-api-v1.onrender.com/api/note/logCheck", {
        method: "GET",
        mode: "cors",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          setUsername(data.data.Username);
          setLogged(true);
        })
        .catch((err) => err.Error());
    };
    func();
  }, [appLogged]);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    const func = async () => {
      await fetch("https://note-api-v1.onrender.com/api/user/logout", {
        method: "POST",
        mode: "cors",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.message);
          navigate("/note-taking-app/");
          logoutFunc();
        })
        .then((err) => console.log(err));
    };

    func();
    handleCloseUserMenu();
  };

  return (
    <AppBar
      id="navbar"
      position="static"
      sx={{ height: { xs: "60px", md: "70px" } }}
    >
      <Container
        maxWidth={false}
        sx={{ justifyContent: "space-between", padding: 0, m: 0 }}
      >
        <Toolbar disableGutters>
          <ClassIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/note-taking-app/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            NOTE2DAY
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem key="new" onClick={handleCloseNavMenu}>
                <Button component={RouterLink} to="/note-taking-app/new">
                  NEW
                </Button>
              </MenuItem>
            </Menu>
          </Box>
          <ClassIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            NOTE2DAY
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              ml: "auto",
            }}
          >
            {logged &&
              pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                  component={RouterLink}
                  to={`/note-taking-app/${page}`}
                >
                  {page}
                </Button>
              ))}
          </Box>

          <Box sx={{ flexGrow: 0, ml: "auto" }}>
            {logged ? (
              <Tooltip title="Open settings">
                <Button
                  onClick={handleOpenUserMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {username}
                </Button>
              </Tooltip>
            ) : (
              <Box sx={{ display: "flex" }}>
                <Button
                  component={RouterLink}
                  to="/note-taking-app/login"
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Log in
                </Button>
                <Button
                  component={RouterLink}
                  to="/note-taking-app/register"
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Register
                </Button>
              </Box>
            )}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
