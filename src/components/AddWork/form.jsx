import { useAuth } from "@/contexts/auth";
import { db } from "@/lib/firebase";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Form, Formik } from "formik";
import { useSWRConfig } from "swr";
function AddWorkForm({ setOpenDrawer }) {
  const { user } = useAuth();
  const { mutate } = useSWRConfig();

  return (
    <Formik
      initialValues={{
        name: "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = "Required";
        }
        return errors;
      }}
      onSubmit={async (values) => {
        try {
          await addDoc(collection(db, "works"), {
            uid: user.uid,
            name: values.name,
            created_at: serverTimestamp(),
            updated_at: serverTimestamp(),
            is_time_tracking: false,
          });
          mutate(`list_work_${user.uid}`);
          setOpenDrawer(false);
        } catch (error) {
          console.error(error);
        }
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
