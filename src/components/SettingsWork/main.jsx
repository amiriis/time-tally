import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Container,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from "@mui/material";
import Link from "next/link";

function MainSetting({ work }) {
  return (
    <>
      <Container maxWidth={"xs"} sx={{ my: 1 }}>
        <Typography variant="subtitle2" color={"primary.main"}>
          Settings
        </Typography>
        <List dense>
          <ListItem
            disablePadding
            secondaryAction={
              <Typography color={"primary.main"} variant="caption">
                {work?.name || ""}
              </Typography>
            }
          >
            <ListItemButton
              component={Link}
              href={`/u/settings-work/${work?.id || ""}/name`}
            >
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary="Edit name" />
            </ListItemButton>
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem
            disablePadding
            secondaryAction={
              <Typography color={"primary.main"} variant="caption">
                {work?.settings?.calendar || ""}
              </Typography>
            }
          >
            <ListItemButton
              component={Link}
              href={`/u/settings-work/${work?.id || ""}/calendar`}
            >
              <ListItemIcon>
                <CalendarMonthIcon />
              </ListItemIcon>
              <ListItemText primary="Change calendar" />
            </ListItemButton>
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              href={`/u/settings-work/${work?.id || ""}/delete`}
            >
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText primary="Delete Work" />
            </ListItemButton>
          </ListItem>
        </List>
      </Container>
    </>
  );
}

export default MainSetting;
