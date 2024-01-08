import { useAuth } from "@/contexts/auth";
import { db } from "@/lib/firebase";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { Form, Formik } from "formik";
import moment from "jalali-moment";

function SettingsWorkForm({ work, setOpenDrawer }) {
  const { user } = useAuth();

  return (
    <Formik
      initialValues={{
        calendar: work.settings.calendar,
      }}
      validate={(values) => {
        const errors = {};
        if (!values.calendar) {
          errors.calendar = "Required";
        }
        return errors;
      }}
      onSubmit={async (values) => {
        const _data = {
          settings: {
            calendar: values.calendar,
          },
        };
        try {
          updateDoc(doc(collection(db, "works"), work.id), _data);
        } catch (error) {
          const errorData = {
            code: error.code,
            message: error.message,
            stack: error.stack,
          };
          addDoc(collection(db, "logs"), {
            action: "edit work (settings)",
            params: { old: work, now: _data },
            user: user,
            error: errorData,
            created_at: moment().toDate(),
          });
        }
        setOpenDrawer(false);
      }}
    >
      {({ values, handleChange, handleBlur, isSubmitting, isValid, dirty }) => (
        <Form>
          <Container maxWidth={"xs"} sx={{ py: 5 }}>
            <Stack spacing={3}>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Typography variant="h5">Settings work</Typography>
                <Button
                  type="submit"
                  disabled={isSubmitting || !isValid || !dirty}
                >
                  Change
                </Button>
              </Stack>
              <FormControl fullWidth>
                <InputLabel id="calendar">Calendar</InputLabel>
                <Select
                  labelId="calendar"
                  id="calendar-select"
                  name="calendar"
                  value={values.calendar}
                  label="calendar"
                  onChange={handleChange}
                >
                  <MenuItem value={"gregorian"}>Gregorian</MenuItem>
                  <MenuItem value={"jalali"}>Jalali</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Container>
        </Form>
      )}
    </Formik>
  );
}

export default SettingsWorkForm;
