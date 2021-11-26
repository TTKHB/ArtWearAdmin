import React from "react";
import { DropzoneDialogBase } from "material-ui-dropzone";
import { DropzoneDialog } from "material-ui-dropzone";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { colors } from "./../../assets/data/colors";
import Box from "@mui/material/Box";

const AddPhotoCover = () => {
  const [open, setOpen] = React.useState(false);
  const [fileObjects, setFileObjects] = React.useState([]);
  console.log(
    "🚀 ~ file: AddPhotoCover.js ~ line 15 ~ AddPhotoCover ~ fileObjects",
    fileObjects
  );
  const [selectColor, setSelectColor] = React.useState({ name: "sadsa" });
  console.log(
    "🚀 ~ file: AddPhotoCover.js ~ line 15 ~ AddPhotoCover ~ selectColor",
    selectColor
  );

  const dialogTitle = () => (
    <>
      <span>Upload file</span>

      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        autoHighlight
        onChange={(e, data) => {
          setSelectColor(data);
        }}
        options={colors}
        getOptionLabel={(option) => option.name}
        renderOption={(props, option) => (
          console.log(
            "🚀 ~ file: AddPhotoCover.js ~ line 35 ~ AddPhotoCover ~ option",
            option
          ),
          (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <p>{option.name}</p>
            </Box>
          )
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Chọn màu"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
    </>
  );

  return (
    <Container style={{ flex: 1 }}>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add Image
      </Button>

      <DropzoneDialogBase
        dialogTitle={dialogTitle()}
        acceptedFiles={["image/*"]}
        fileObjects={fileObjects}
        filesLimit={20}
        cancelButtonText={"cancel"}
        submitButtonText={"submit"}
        maxFileSize={5000000}
        open={open}
        onAdd={(newFileObjs) => {
          console.log("onAdd", newFileObjs);
          setFileObjects([].concat(fileObjects, newFileObjs));
        }}
        onDelete={(deleteFileObj) => {
          console.log("onDelete", deleteFileObj);
        }}
        onClose={() => setOpen(false)}
        onSave={() => {
          console.log("onSave", fileObjects);
          setOpen(false);
        }}
        showPreviews={true}
        showFileNamesInPreview={true}
      />
    </Container>
  );
};

export default AddPhotoCover;
