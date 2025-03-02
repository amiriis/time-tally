import { db } from "@/lib/firebase";
import { Checkbox, MenuItem, Typography } from "@mui/material";
import { addDoc, collection, deleteField, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const Overtime = ({ time }) => {
    const [checked, setChecked] = useState(!!time?.isOvertime);

    useEffect(() => {
        let _data;
        if (checked) {
            _data = {
                isOvertime: true
            }
        }
        else {
            _data = {
                isOvertime: deleteField()
            }
        }

        try {
            updateDoc(doc(collection(db, "times"), time.id), _data);
        } catch (error) {
            const errorData = {
                code: error.code,
                message: error.message,
                stack: error.stack,
            };
            addDoc(collection(db, "logs"), {
                action: "overtime",
                params: { old: time, now: _data },
                user: user,
                error: errorData,
                created_at: moment().toDate(),
            });
        }
    }, [checked])

    return (
        <MenuItem onClick={() => setChecked(c => !c)}>
            <Checkbox size="small" sx={{ p: 0 }} checked={checked} />
            <Typography sx={{ pl: 1 }} textAlign="center">
                Overtime
            </Typography>
        </MenuItem>
    )
}
export default Overtime