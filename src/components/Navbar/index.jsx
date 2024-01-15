import { useAuth } from "@/contexts/auth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Avatar,
  Stack,
  CircularProgress,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Link from "next/link";

const mainPageList = ["/u", "/headquarter"];

function Navbar() {
  const { user, logOut, initAuth } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0}>
        <Container maxWidth="xs">
          <Toolbar disableGutters>
            {mainPageList.includes(pathname) ? (
              <Stack direction={"row"} alignItems={"flex-end"}>
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    display: "flex",
                    fontFamily: "monospace",
                    fontWeight: 500,
                    letterSpacing: ".1rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  Time Tally
                </Typography>
                <Typography
                  variant="caption"
                  noWrap
                  sx={{
                    mr: 2,
                    display: "flex",
                    fontFamily: "monospace",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  {process.env.NEXT_PUBLIC_VERSION}
                </Typography>
              </Stack>
            ) : (
              <IconButton color="inherit" onClick={() => router.back()}>
                <ArrowBackIcon />
              </IconButton>
            )}
            <Box sx={{ flexGrow: 1 }}></Box>
            <Stack direction={"row"} spacing={1.5}>
              {!initAuth ? (
                <CircularProgress />
              ) : (
                user && (
                  <>
                    <Button
                      component={Link}
                      href={"https://reymit.ir/timetally"}
                      target="_blank"
                      passHref
                      variant="outlined"
                      size="small"
                      color="inherit"
                    >
                      Donate !
                    </Button>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        imgProps={{ referrerPolicy: "no-referrer" }}
                        alt={user.displayName}
                        src={user.photoURL}
                      />
                    </IconButton>
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
                      {user.role === "admin" ? (
                        pathname.startsWith("/headquarter") ? (
                          user.role === "admin" && (
                            <MenuItem
                              onClick={() => {
                                handleCloseUserMenu();
                                router.replace("/u");
                              }}
                            >
                              <Typography textAlign="center">
                                Go to user panel
                              </Typography>
                            </MenuItem>
                          )
                        ) : (
                          <MenuItem
                            onClick={() => {
                              handleCloseUserMenu();
                              router.replace("/headquarter");
                            }}
                          >
                            <Typography textAlign="center">
                              Go to headquarter
                            </Typography>
                          </MenuItem>
                        )
                      ) : null}
                      <MenuItem
                        onClick={() => {
                          handleCloseUserMenu();
                          logOut();
                        }}
                      >
                        <Typography textAlign="center">Logout</Typography>
                      </MenuItem>
                    </Menu>
                  </>
                )
              )}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
export default Navbar;
