import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box, IconButton, Menu, Stack, Typography } from "@mui/material";
import moment from "jalali-moment";
import { useMemo, useState } from "react";
import DeleteTime from "../DeleteTime";
import EditTime from "../EditTime";
import { convertLocaleMomentWithCalendar } from "@/lib/convertLocaleMomentWithCalendar";

function TimeCard({ work, time }) {
  const [anchorElEdit, setAnchorElEdit] = useState(null);
  const started_at = useMemo(() => {
    return moment(time.started_at.toDate());
  }, [time.started_at]);
  const ended_at = useMemo(() => {
    return moment(time.ended_at.toDate());
  }, [time.ended_at]);

  const { hours, minutes, seconds } = time.total_time;

  const handleOpenEditMenu = (event) => {
    setAnchorElEdit(event.currentTarget);
  };

  const handleCloseEditMenu = () => {
    setAnchorElEdit(null);
  };

  return (
    <Stack
      sx={{ border: 1, borderRadius: 1, borderColor: "divider" }}
      direction={"row"}
      alignItems={"center"}
    >
      <Stack
        direction={"row"}
        sx={{ p: 1, flexGrow: 1 }}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack alignItems={"center"}>
          <Typography variant="caption">
            {started_at
              .locale(convertLocaleMomentWithCalendar(work.settings.calendar))
              .format("YYYY/MM/DD")}
          </Typography>
          <Typography variant="caption">
            {started_at.format("HH:mm")}
          </Typography>
        </Stack>
        <ArrowRightAltIcon color="primary" />
        <Stack alignItems={"center"}>
          <Typography variant="caption">
            {ended_at
              .locale(convertLocaleMomentWithCalendar(work.settings.calendar))
              .format("YYYY/MM/DD")}
          </Typography>
          <Typography variant="caption">{ended_at.format("HH:mm")}</Typography>
        </Stack>
      </Stack>
      <Typography
        textAlign={"center"}
        color={"primary.main"}
        sx={{ flexGrow: 1 }}
      >
        {`${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`}
      </Typography>
      <Box>
        <IconButton onClick={handleOpenEditMenu}>
          <MoreHorizIcon />
        </IconButton>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElEdit}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElEdit)}
          onClose={handleCloseEditMenu}
        >
          <EditTime
            work={work}
            time={time}
            handleCloseEditMenu={handleCloseEditMenu}
          />
          <DeleteTime time={time} handleCloseEditMenu={handleCloseEditMenu} />
        </Menu>
      </Box>
    </Stack>
  );
}

export default TimeCard;
