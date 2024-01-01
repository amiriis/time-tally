"use client";

import ThemeRegistry from "@/components/ThemeRegisery/ThemeRegistery";
import Navbar from "@/components/Navbar";
import { useApp } from "@/contexts/app";
import { useAuth } from "@/contexts/auth";
import { Container, Typography, Collapse } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import LocalNavbar from "@/components/LocalNavbar";

export default function Template({ children }) {
  const { isLocalDb } = useApp();
  const { user, initAuth } = useAuth();
  return (
    <ThemeRegistry>
      <Navbar />
      <TransitionGroup>
        {isLocalDb && (
          <Collapse>
            <LocalNavbar />
          </Collapse>
        )}
        <Collapse>
          <Container sx={{ mt: 3 }} maxWidth="xs">
            {!initAuth ? null : !user ? (
              <Typography>Please Login...</Typography>
            ) : (
              <>{children}</>
            )}
          </Container>
        </Collapse>
      </TransitionGroup>
    </ThemeRegistry>
  );
}
