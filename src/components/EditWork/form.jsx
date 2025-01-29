import { useAuth } from "@/contexts/auth";
import { db } from "@/lib/firebase";
import { ArrowBack } from "@mui/icons-material";
import { Button, Container, IconButton, Stack, TextField, Typography } from "@mui/material";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { Form, Formik } from "formik";
import moment from "jalali-moment";
import { useRouter } from "next/navigation";

function EditWorkForm({ work }) {
    const { user } = useAuth();
    const router = useRouter();

    return (
        <Formik
            initialValues={{
                name: work?.name || "",
            }}
            enableReinitialize
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
                router.back();
            }}
        >
            {({ values, handleChange, handleBlur, isSubmitting, isValid, dirty }) => (
                <Form>
                    <Container maxWidth={"xs"} sx={{ my: 1 }}>
                        <Typography variant="subtitle2" color={"primary.main"}>
                            Settings / Edit name
                        </Typography>
                        <Stack spacing={2} sx={{ py: 1 }}>
                            <Stack direction={"row"} justifyContent={"space-between"}>
                                <IconButton onClick={() => router.back()}>
                                    <ArrowBack fontSize="inherit" />
                                </IconButton>
                                <Button type="submit" disabled={isSubmitting || !isValid || !dirty}>
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
