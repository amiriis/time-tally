import { useAuth } from "@/contexts/auth";
import convertDurationToTime from "@/lib/convertDurationToTime";
import { db } from "@/lib/firebase";
import { Button, Container, Stack, Typography } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
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

function EndToForm({ work, setOpenDrawer }) {
  const { user } = useAuth();
  
  return (
    <Formik
      initialValues={{
        ended_at: "",
      }}
      validationSchema={Yup.object().shape({
        ended_at: Yup.date().required(),
      })}
      onSubmit={async (values) => {
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

        const _dataTime = {
          started_at,
          ended_at: ended_at.toDate(),
          total_time,
          wid: work.id,
          uid: work.uid,
          created_at: moment().toDate(),
          updated_at: moment().toDate(),
        };
        const _dataWork = {
          is_time_tracking: false,
          time_tracking_started_at: deleteField(),
        };

        try {

          addDoc(collection(db, "times"), _dataTime);
          updateDoc(doc(collection(db, "works"), work.id), _dataWork);
        } catch (error) {
          const errorData = {
            code: error.code,
            message: error.message,
            stack: error.stack,
          };
          addDoc(collection(db, "logs"), {
            action: "add time and edit work (end to)",
            params: {
              old: { work },
              now: { work: _dataWork, time: _dataTime },
            },
            user: user,
            error: errorData,
            created_at: moment().toDate(),
          });
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
              <DateTimePicker
                ampm={false}
                disabled={isSubmitting}
                value={values.ended_at !== "" ? values.ended_at.toDate() : null}
                onChange={(newValue) => {
                  setFieldValue("ended_at", moment(newValue));
                }}
                minDateTime={work.time_tracking_started_at.toDate()}
                label="Enter end"
              />
            </Stack>
          </Container>
        </Form>
      )}
    </Formik>
  );
}

export default EndToForm;
