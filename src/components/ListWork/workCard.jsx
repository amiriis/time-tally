"use client";
import { Analytics } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Button, Collapse, IconButton, Stack, Typography } from "@mui/material";
import moment from "jalali-moment";
import Link from "next/link";
import { useState } from "react";
import { TransitionGroup } from "react-transition-group";
import TimeInterval from "../TimeInterval";
import WorkAnalytics from "../WorkAnalytics";

function WorkCard({ work }) {
    const [showWorkAnalytics, setShowWorkAnalytics] = useState(false);
    return (
        <TransitionGroup
            component={Stack}
            sx={{
                my: 1,
                border: 1,
                borderRadius: 1,
                borderColor: work.is_time_tracking ? "warning.main" : "divider",
            }}
        >
            <Collapse>
                <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    sx={{
                        p: 2,
                    }}
                >
                    <Stack>
                        <Typography variant="h6">{work.name}</Typography>
                        <Typography variant="caption">Calendar: {work.settings.calendar}</Typography>
                    </Stack>
                    <Stack direction={"row"}>
                        <IconButton
                            color={showWorkAnalytics ? "primary" : ""}
                            onClick={() => {
                                setShowWorkAnalytics((s) => !s);
                            }}
                        >
                            <Analytics fontSize="inherit" />
                        </IconButton>
                        <IconButton component={Link} href={`/u/settings-work/${work.id}`}>
                            <MenuIcon fontSize="inherit" />
                        </IconButton>
                    </Stack>
                </Stack>
            </Collapse>
            {showWorkAnalytics && (
                <Collapse>
                    <WorkAnalytics work={work} />
                </Collapse>
            )}
            <Collapse sx={{ width: "100%" }}>
                <Button
                    fullWidth
                    component={Link}
                    href={`/u/work/${work.id}`}
                    passHref
                    size="large"
                    color={work.is_time_tracking ? "warning" : "primary"}
                    variant="contained"
                    sx={{
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        "& .MuiButton-endIcon>*:nth-of-type(1)": {
                            fontSize: "0.9375rem",
                        },
                    }}
                    startIcon={<OpenInNewIcon />}
                    endIcon={
                        work.is_time_tracking && (
                            <TimeInterval start_at={moment(work.time_tracking_started_at.toDate())} />
                        )
                    }
                >
                    Go to times
                </Button>
            </Collapse>
        </TransitionGroup>
    );
}

export default WorkCard;
