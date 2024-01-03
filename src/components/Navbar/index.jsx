import { useAuth } from "@/contexts/auth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

function Navbar() {
  const { user, loginWithGoogle, logOut, initAuth } = useAuth();
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
            {pathname === "/u" ? (
              <Box>
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    mr: 2,
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
              </Box>
            ) : (
              <IconButton color="inherit" onClick={() => router.back()}>
                <ArrowBackIcon />
              </IconButton>
            )}
            <Box sx={{ flexGrow: 1 }}></Box>
            <Box>
              {!initAuth ? (
                <CircularProgress />
              ) : !user ? (
                <Button color="inherit" onClick={loginWithGoogle}>
                  Login
                </Button>
              ) : (
                <>
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
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
export default Navbar;
