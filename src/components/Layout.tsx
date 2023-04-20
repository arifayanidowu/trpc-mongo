import {
  AdbOutlined,
  Brightness4Rounded,
  Brightness7Rounded,
  Close,
  Menu as MenuIcon,
} from "@mui/icons-material";
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
  useTheme,
} from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import { ColorModeContext } from "@/theme/ThemeWrapper";

const pages = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];
const settings = ["Account", "Dashboard", "Logout"];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: sessionData } = useSession();
  const router = useRouter();
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
                    border: (theme) => "1px solid " + theme.palette.divider,
                  },
                }}
                elevation={0}
              >
                {pages.map((page) => (
                  <MenuItem key={page.href} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.name}</Typography>
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
                  key={page.href}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    display: "block",
                    color: "white",
                    backgroundColor: (theme) =>
                      router.pathname === page.href
                        ? theme.palette.divider
                        : "transparent",
                    textAlign: "center",
                  }}
                  component={Link}
                  href={page.href}
                >
                  {page.name}
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
              <motion.div
                whileTap={{ scale: 0.9, rotate: "135deg" }}
                transition={{
                  type: "tween",
                }}
              >
                <IconButton onClick={toggleColorMode}>
                  {theme.palette.mode === "dark" ? (
                    <Brightness4Rounded />
                  ) : (
                    <Brightness7Rounded />
                  )}
                </IconButton>
              </motion.div>
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
                  <motion.div
                    whileTap={{ scale: 0.8 }}
                    transition={{
                      type: "tween",
                    }}
                  >
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Image
                          alt={sessionData.user.name ?? "Avatar"}
                          src={sessionData.user.image ?? ""}
                          width={40}
                          height={40}
                          style={{
                            borderRadius: "50%",
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                  </motion.div>
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
                        border: (theme) => "1px solid " + theme.palette.divider,
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
