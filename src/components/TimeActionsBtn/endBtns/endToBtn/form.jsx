import convertDurationToTime from "@/lib/convertDurationToTime";
import { db } from "@/lib/firebase";
import { Button, Container, Stack, Typography } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import {
  addDoc,
  collection,
  deleteField,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Form, Formik } from "formik";
import moment from "jalali-moment";
import * as Yup from "yup";

function EndToForm({ work, setOpenDrawer, setDisabled }) {
  return (
    <Formik
      initialValues={{
        ended_at: "",
      }}
      validationSchema={Yup.object().shape({
        ended_at: Yup.date().required(),
      })}
      onSubmit={async (values) => {
        setDisabled(true);
        try {
          const started_at = work.time_tracking_started_at.toDate();
          const ended_at = values.ended_at;

          const durationInMilliseconds = ended_at.diff(started_at);
          const duration = convertDurationToTime(durationInMilliseconds);

          const total_time = {
            duration: durationInMilliseconds,
            hours: duration.hours,
            minutes: duration.minutes,
            seconds: duration.seconds,
          };

          addDoc(collection(db, "times"), {
            started_at,
            ended_at: ended_at.toDate(),
            total_time,
            wid: work.id,
            uid: work.uid,
            created_at: moment().toDate(),
            updated_at: moment().toDate(),
          });

          updateDoc(doc(collection(db, "works"), work.id), {
            is_time_tracking: false,
            time_tracking_started_at: deleteField(),
          });
        } catch (error) {
          setDisabled(false);
          console.error(error);
        }
        setOpenDrawer(false);
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        isSubmitting,
        isValid,
        dirty,
        setFieldValue,
      }) => (
        <Form>
          <Container maxWidth={"xs"} sx={{ py: 5 }}>
            <Stack spacing={3}>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Typography variant="h5">End to</Typography>
                <Button
                  variant="text"
                  type="submit"
                  color="primary"
                  disabled={isSubmitting || !isValid || !dirty}
                >
                  send
                </Button>
              </Stack>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker
                  ampm={false}
                  disabled={isSubmitting}
                  value={values.ended_at !== "" ? values.ended_at : null}
                  onChange={(newValue) => {
                    setFieldValue("ended_at", newValue);
                  }}
                  minDateTime={moment(work.time_tracking_started_at.toDate())}
                  label="Enter end"
                />
              </LocalizationProvider>
            </Stack>
          </Container>
        </Form>
      )}
    </Formik>
  );
}

export default EndToForm;
