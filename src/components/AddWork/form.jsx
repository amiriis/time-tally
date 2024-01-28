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
  TextField,
  Typography,
} from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { Form, Formik } from "formik";
import moment from "jalali-moment";
import { useRouter } from "next/navigation";
function AddWorkForm() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        name: "",
        calendar: "gregorian",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = "Required";
        }
        if (!values.calendar) {
          errors.calendar = "Required";
        }
        return errors;
      }}
      onSubmit={async (values) => {
        const _data = {
          uid: user.uid,
          name: values.name.toUpperCase(),
          settings: {
            calendar: values.calendar,
          },
          created_at: moment().toDate(),
          updated_at: moment().toDate(),
          is_time_tracking: false,
        };

        try {
          addDoc(collection(db, "works"), _data);
        } catch (error) {
          const errorData = {
            code: error.code,
            message: error.message,
            stack: error.stack,
          };
          addDoc(collection(db, "logs"), {
            action: "add work",
            params: _data,
            user: user,
            error: errorData,
            created_at: moment().toDate(),
          });
        }
        router.back();
      }}
    >
      {({ values, handleChange, handleBlur, isSubmitting, isValid, dirty }) => (
        <Form>
          <Container maxWidth={"xs"} sx={{ py: 5 }}>
            <Stack spacing={3}>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Typography variant="h5">New work</Typography>
                <Button
                  type="submit"
                  disabled={isSubmitting || !isValid || !dirty}
                >
                  Create
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
              <TextField
                name="name"
                disabled={isSubmitting}
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
                autoComplete="off"
                variant="outlined"
                label={"Enter name"}
              />
            </Stack>
          </Container>
        </Form>
      )}
    </Formik>
  );
}

export default AddWorkForm;
