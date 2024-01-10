import { Stack } from "@mui/material";

export const metadata = {
  title: "Headquarter",
};
function Layout({ actions, list }) {
  return (
    <Stack>
      {actions}
      {list}
    </Stack>
  )
}

export default Layout