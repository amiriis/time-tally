import convertDurationToTime from "@/lib/convertDurationToTime";
import { db } from "@/lib/firebase";
import { Button, Container, Stack, Typography } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import {
  collection,
  doc,
  runTransaction,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { Form, Formik } from "formik";
import moment from "jalali-moment";
import { useSWRConfig } from "swr";
import * as Yup from "yup";

function EditTimeForm({ time, setOpenDrawer }) {
  return (
    <Formik
      initialValues={{
        started_at: moment(time.started_at.toDate()),
        ended_at: moment(time.ended_at.toDate()),
      }}
      validationSchema={Yup.object().shape({
        started_at: Yup.date().required(),
        ended_at: Yup.date().required(),
      })}
      onSubmit={async (values) => {
        try {
          const started_at = values.started_at;
          const ended_at = values.ended_at;

          const durationInMilliseconds = ended_at.diff(started_at);
          const duration = convertDurationToTime(durationInMilliseconds);

          const total_time = {
            duration: durationInMilliseconds,
            hours: duration.hours,
            minutes: duration.minutes,
            seconds: duration.seconds,
          };

          updateDoc(doc(collection(db, "times"), time.id), {
            started_at: started_at.toDate(),
            ended_at: ended_at.toDate(),
            total_time,
            updated_at: moment().toDate(),
          });
        } catch (error) {
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
                <Typography variant="h5">Edit time</Typography>
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
                  value={values.started_at !== "" ? values.started_at : null}
                  onChange={(newValue) => {
                    setFieldValue("started_at", newValue);
                  }}
                  maxDateTime={values.ended_at}
                  label="Enter start"
                />
                <DateTimePicker
                  ampm={false}
                  disabled={isSubmitting}
                  value={values.ended_at !== "" ? values.ended_at : null}
                  onChange={(newValue) => {
                    setFieldValue("ended_at", newValue);
                  }}
                  minDateTime={values.started_at}
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

export default EditTimeForm;
