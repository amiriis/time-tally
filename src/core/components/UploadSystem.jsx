import {Box, Button, FormHelperText, TextField, Typography} from "@mui/material";
import {useTranslations} from "next-intl";
import Image from "next/image";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {useRef, useState} from "react";

const UploadSystem = ({
                          fieldName,
                          default_image,
                          helperText,
                          error,
                          setFieldValue,
                          imageAlt,
                          label,
                          enableDelete
                      }) => {
    const t = useTranslations();
    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(default_image || "/images/upload-image.svg");
    const [fileType, setFileType] = useState(null);
    const [fileName, setFileName] = useState("");

    // upload files
    const handleUploadChange = (event) => {
        const uploadedFile = event.target?.files?.[0];
        if (uploadedFile) {
            setSelectedImage(URL.createObjectURL(uploadedFile));
            setFileType(uploadedFile.type);
            setFileName(uploadedFile.name);
            setFieldValue(fieldName, uploadedFile);
        }
    };
    // end upload files

    const uploadBoxStyle = error ? {
        cursor: "pointer",
        objectFit: "contain",
        border: "1px dashed #d32f2f",
        borderRadius: "5px",
        padding: "5px",
    } : {
        cursor: "pointer",
        objectFit: "contain",
        border: "1px dashed #e1e1e1",
        borderRadius: "5px",
        padding: "5px",
    }

    const handleClick = () => {
        fileInputRef.current.click();
    };
    const handleDeleteImage = () => {
        setselectedImage("/images/upload-image.svg");
        setFieldValue(fieldname, null);
    };

    return (
        <Box sx={{my: 2}}>
            <Typography
                margin={1}
                sx={{
                    fontWeight: 500,
                    fontSize: "0.9rem",
                    color: "#a19d9d",
                }}
                textAlign="center"
            >
                {label}
            </Typography>
            <Box sx={{position: "relative"}}>

            </Box>
            {selectedImage === "/images/upload-image.svg" || selectedImage === default_image ? (
                <Image
                    src={selectedImage}
                    priority
                    alt={imageAlt}
                    width={200}
                    height={200}
                    onClick={handleClick}
                    style={uploadBoxStyle}
                />
            ) : fileType && fileType.startsWith("image/") ? (
                <Image
                    src={selectedImage}
                    priority
                    alt={imageAlt}
                    width={200}
                    height={200}
                    onClick={handleClick}
                    style={uploadBoxStyle}
                />
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        border: "1px dashed #e1e1e1",
                        cursor: "pointer",
                        borderRadius: "5px",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "200px",
                        height: "200px"
                    }}
                    onClick={handleClick}
                >
                    <Typography
                        margin={2}
                        sx={{
                            fontWeight: 600,
                            fontSize: "1rem",
                            color: "#a19d9d",
                            textAlign: "center",
                            display: "flex",
                            justifyContent: "end",
                            overflow: "hidden"
                        }}
                        textAlign="center"
                    >
                        {fileName}
                    </Typography>
                </Box>
            )}

            <TextField
                id="avatar-upload"
                type="file"
                accept="image/*"
                style={{display: "none"}}
                onChange={(e) => handleUploadChange(e)}
                inputRef={fileInputRef}
            />
            {enableDelete ? <Button
                sx={{
                    width: "100%",
                    borderTopLeftRadius: "unset",
                    borderTopRightRadius: "unset",
                }}
                color="error"
                disabled={selectedImage === "/images/upload-image.svg"}
                endIcon={<DeleteForeverIcon/>}
                variant="contained"
                onClick={handleDeleteImage}
            >
                {t("delete")}
            </Button> : ""}
            <FormHelperText sx={{color: "#d32f2f"}}>{helperText}</FormHelperText>
        </Box>
    );
};

export default UploadSystem;
