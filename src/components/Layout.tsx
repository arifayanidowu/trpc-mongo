import { AdbOutlined, Close, Menu as MenuIcon } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Container,
  MenuItem,
  Menu,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Tooltip,
  Avatar,
  useTheme,
} from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import React, { useContext } from "react";

import { ColorModeContext } from "@/theme/ThemeWrapper";
import SunIcon from "./icons/SunIcon";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: sessionData } = useSession();
  const theme = useTheme();
  const { toggleColorMode } = useContext(ColorModeContext);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

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
    void signOut();
  };

  return (
    <>
      <AppBar
        position="fixed"
        enableColorOnDark
        elevation={0}
        color="transparent"
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component={Link}
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                alignItems: "center",
                fontWeight: 700,
                textDecoration: "none",
                color: (theme) =>
                  theme.palette.mode === "dark" ? "white" : "black",
              }}
            >
              <AdbOutlined
                sx={{
                  display: { xs: "none", md: "flex" },
                  mr: 1,
                  color: (theme) =>
                    theme.palette.mode === "dark" ? "white" : "black",
                }}
              />
              T3Realtors
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
              >
                {Boolean(anchorElNav) ? <Close /> : <MenuIcon />}
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
                PaperProps={{
                  sx: {
                    border: "1px solid #ccc",
                  },
                }}
                elevation={0}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbOutlined
              sx={{
                display: { xs: "flex", md: "none" },
                mr: 1,
                color: (theme) =>
                  theme.palette.mode === "dark" ? "white" : "black",
              }}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontWeight: 700,
                color: (theme) =>
                  theme.palette.mode === "dark" ? "white" : "black",
                textDecoration: "none",
              }}
            >
              T3Realtors
            </Typography>
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex", gap: 1 } }}
            >
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, display: "block", color: "white" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box
              sx={{
                flexGrow: 0,
                display: "flex",
                gap: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton onClick={toggleColorMode}>
                <SunIcon
                  fontSize="medium"
                  height={48}
                  mode={theme.palette.mode}
                />
              </IconButton>
              {!sessionData?.user ? (
                <Button
                  sx={{ my: 2, display: "block", color: "white" }}
                  onClick={() => void signIn()}
                  variant="contained"
                >
                  Sign in
                </Button>
              ) : (
                <>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt={sessionData.user.name ?? "Avatar"}
                        src={sessionData.user.image ?? ""}
                      />
                    </IconButton>
                  </Tooltip>
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
                    PaperProps={{
                      sx: {
                        border: "1px solid #ccc",
                      },
                    }}
                    elevation={0}
                  >
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting}
                        onClick={
                          setting === "Logout"
                            ? () => handleLogout()
                            : () => handleCloseUserMenu()
                        }
                      >
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* <Toolbar /> */}
      {children}
    </>
  );
};

export default Layout;
