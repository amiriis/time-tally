import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import moment from "jalali-moment";
import React, { useMemo, useState } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function TimeCard({ time }) {
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
            {started_at.format("YYYY/MM/DD")}
          </Typography>
          <Typography variant="caption">
            {started_at.format("HH:mm:ss")}
          </Typography>
        </Stack>
        <ArrowRightAltIcon color="primary" />
        <Stack alignItems={"center"}>
          <Typography variant="caption">
            {ended_at.format("YYYY/MM/DD")}
          </Typography>
          <Typography variant="caption">
            {ended_at.format("HH:mm:ss")}
          </Typography>
        </Stack>
      </Stack>
      <Typography
        textAlign={"center"}
        color={"primary.main"}
        sx={{ flexGrow: 1 }}
      >
        {`${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
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
          <MenuItem
            onClick={() => {
              handleCloseEditMenu();
            }}
          >
            <EditIcon fontSize="inherit" />
            <Typography sx={{ pl: 1 }} textAlign="center">
              Edit
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleCloseEditMenu();
            }}
          >
            <DeleteIcon fontSize="inherit" />
            <Typography sx={{ pl: 1 }} textAlign="center">
              Delete
            </Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Stack>
  );
}

export default TimeCard;
