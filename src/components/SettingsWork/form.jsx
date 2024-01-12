import { useAuth } from "@/contexts/auth";
import { db } from "@/lib/firebase";
import { ArrowBack } from "@mui/icons-material";
import {
  Button,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { Form, Formik } from "formik";
import moment from "jalali-moment";
import { useRouter } from "next/navigation";

function SettingsWorkForm({ work }) {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        calendar: work?.settings.calendar || "",
      }}
      enableReinitialize
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
        router.back();
      }}
    >
      {({ values, handleChange, handleBlur, isSubmitting, isValid, dirty }) => (
        <Form>
          <Container maxWidth={"xs"} sx={{ my: 1 }}>
            <Typography variant="subtitle2" color={"primary.main"}>
              Settings / Change calendar
            </Typography>
            <Stack spacing={2} sx={{ py: 1 }}>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <IconButton onClick={() => router.back()}>
                  <ArrowBack fontSize="inherit" />
                </IconButton>
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
