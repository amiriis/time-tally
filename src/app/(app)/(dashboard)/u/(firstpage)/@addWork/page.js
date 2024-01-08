import AddWork from '@/components/AddWork'
import { Stack, Typography } from '@mui/material'

function AddWorkPage() {
  return (
      <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h5">Works</Typography>
          <AddWork />
      </Stack>
  )
}

export default AddWorkPage