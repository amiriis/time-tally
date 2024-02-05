"use client";

import LocalNavbar from "@/components/LocalNavbar";
import Navbar from "@/components/Navbar";
import { useApp } from "@/contexts/app";
import { FCMNotificationProvider } from "@/contexts/fcm-notification";
import { Collapse, Container } from "@mui/material";
import { TransitionGroup } from "react-transition-group";

export default function Template({ children }) {
  const { isLocalDb } = useApp();

  return (
    <FCMNotificationProvider>
      <Navbar />
      <TransitionGroup>
        {isLocalDb && (
          <Collapse>
            <LocalNavbar />
          </Collapse>
        )}
        <Collapse>
          <Container sx={{ mt: 3 }} maxWidth="xs">
            <>{children}</>
          </Container>
        </Collapse>
      </TransitionGroup>
    </FCMNotificationProvider>
  );
}
