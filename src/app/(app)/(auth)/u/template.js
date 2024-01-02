"use client";

import LocalNavbar from "@/components/LocalNavbar";
import Navbar from "@/components/Navbar";
import { useApp } from "@/contexts/app";
import { useAuth } from "@/contexts/auth";
import { Collapse, Container, Typography } from "@mui/material";
import { TransitionGroup } from "react-transition-group";

export default function Template({ children }) {
  const { isLocalDb } = useApp();
  const { user, initAuth } = useAuth();
  return (
    <>
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
    </>
  );
}
