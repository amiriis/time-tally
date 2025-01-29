import { convertLocaleMomentWithCalendar } from "@/lib/convertLocaleMomentWithCalendar";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box, IconButton, Menu, Stack, Typography } from "@mui/material";
import moment from "jalali-moment";
import { useMemo, useState } from "react";
import DeleteTime from "../DeleteTime";
import EditTime from "../EditTime";

const TimeInfo = ({ calendar, time }) => {
    const [anchorElEdit, setAnchorElEdit] = useState(null);

    const startedAt = useMemo(() => moment(time.started_at.toDate()), [time.started_at]);
    const endedAt = useMemo(() => moment(time.ended_at.toDate()), [time.ended_at]);

    const { hours, minutes } = time.total_time;

    const handleOpenEditMenu = (event) => setAnchorElEdit(event.currentTarget);
    const handleCloseEditMenu = () => setAnchorElEdit(null);

    return (
        <Stack direction="row" alignItems="center">
            <Stack direction="row" sx={{ p: 1, flexGrow: 1 }} alignItems="center" justifyContent="space-between">
                <Stack alignItems="center">
                    <Typography variant="caption">
                        {startedAt.locale(convertLocaleMomentWithCalendar(calendar)).format("YYYY/MM/DD")}
                    </Typography>
                    <Typography variant="caption">{startedAt.format("HH:mm")}</Typography>
                </Stack>
                <ArrowRightAltIcon color="primary" />
                <Stack alignItems="center">
                    <Typography variant="caption">
                        {endedAt.locale(convertLocaleMomentWithCalendar(calendar)).format("YYYY/MM/DD")}
                    </Typography>
                    <Typography variant="caption">{endedAt.format("HH:mm")}</Typography>
                </Stack>
            </Stack>
            <Stack sx={{ flexGrow: 1 }}>
                <Typography textAlign="center" color="primary.main">
                    {`${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`}
                </Typography>
            </Stack>
            <Box>
                <IconButton onClick={handleOpenEditMenu}>
                    <MoreHorizIcon />
                </IconButton>
                <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElEdit}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    keepMounted
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    open={Boolean(anchorElEdit)}
                    onClose={handleCloseEditMenu}
                >
                    <EditTime time={time} handleCloseEditMenu={handleCloseEditMenu} />
                    <DeleteTime time={time} handleCloseEditMenu={handleCloseEditMenu} />
                </Menu>
            </Box>
        </Stack>
    );
};

export default TimeInfo;
