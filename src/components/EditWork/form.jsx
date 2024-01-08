import { useAuth } from "@/contexts/auth";
import { db } from "@/lib/firebase";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { Form, Formik } from "formik";
import moment from "jalali-moment";

function EditWorkForm({ work, setOpenDrawer }) {
  const { user } = useAuth();

  return (
    <Formik
      initialValues={{
        name: work.name,
      }}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = "Required";
        }
        return errors;
      }}
      onSubmit={async (values) => {
        const _data = {
          name: values.name.toUpperCase(),
          updated_at: moment().toDate(),
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
            action: "edit work",
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
                <Typography variant="h5">Edit work</Typography>
                <Button
                  type="submit"
                  disabled={isSubmitting || !isValid || !dirty}
                >
                  Update
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

export default EditWorkForm;
