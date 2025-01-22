import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box, IconButton, Menu, Stack, Typography } from "@mui/material";
import moment from "jalali-moment";
import { useMemo, useState } from "react";
import DeleteTime from "../DeleteTime";
import EditTime from "../EditTime";
import { convertLocaleMomentWithCalendar } from "@/lib/convertLocaleMomentWithCalendar";
import convertDurationToTime from "@/lib/convertDurationToTime";

function TimeCard({ work, time, workingHours }) {
  const [anchorElEdit, setAnchorElEdit] = useState(null);
  const started_at = useMemo(() => {
    return moment(time.started_at.toDate());
  }, [time.started_at]);
  const ended_at = useMemo(() => {
    return moment(time.ended_at.toDate());
  }, [time.ended_at]);
  const { hours, minutes } = time.total_time;
  const { duty_hours, working_days } = workingHours;
  const averageDutyHours = duty_hours / working_days;
  const workingTimeHours = Math.floor(averageDutyHours);
  const workingTimeMinutes = Math.round((averageDutyHours - workingTimeHours) * 60);

  const timeDuration = useMemo(() => {
    let _total_duration = 0;
    const totalMinutesFirstTime = workingTimeHours * 60 + workingTimeMinutes;
    const totalMinutesSecondTime = hours * 60 + minutes;

    if (totalMinutesFirstTime > totalMinutesSecondTime) {
      _total_duration = totalMinutesFirstTime - totalMinutesSecondTime
    } else {
      _total_duration = totalMinutesSecondTime - totalMinutesFirstTime
    }
    return { isgreater: totalMinutesFirstTime > totalMinutesSecondTime, duration: convertDurationToTime(_total_duration * 60 * 1000) };
  }, [hours, minutes, workingTimeHours, workingTimeMinutes]);

  const handleOpenEditMenu = (event) => {
    setAnchorElEdit(event.currentTarget);
  };

  const handleCloseEditMenu = () => {
    setAnchorElEdit(null);
  };

  return (
    <Stack
      sx={{ my: 1, border: 1, borderRadius: 1, borderColor: "divider" }}
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
      <Stack sx={{ flexGrow: 1 }}>
        <Typography
          textAlign={"center"}
          color={"primary.main"}
        >
          {`${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}`}
        </Typography>
        <Typography
          variant="caption"
          textAlign={"center"}
          color={timeDuration.isgreater ? "warning.main" : "success.main"}
        >
          {`${timeDuration.isgreater ? '- ' : '+ '} ${timeDuration.duration.hours.toString().padStart(2, "0")}:${timeDuration.duration.minutes
            .toString()
            .padStart(2, "0")}`}
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
    </Stack >
  );
}

export default TimeCard;
