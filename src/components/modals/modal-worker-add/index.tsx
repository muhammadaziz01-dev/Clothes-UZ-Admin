import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useMask } from "@react-input/mask";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { Button, TextField, RadioGroup, Radio, FormControlLabel } from "@mui/material";
import useWorkerStore from "@store-worker";
import { PostData } from "@worker"
import { validationSchemaWorkerAdd } from "@validations";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const { postData } = useWorkerStore();
  const inputRef = useMask({mask: "+998 (93) ___-__-__",replacement: { _: /\d/ },});
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const initialValues:PostData = {
    age: "",
    email: "",
    first_name: "",
    gender: "",
    last_name: "",
    phone_number: "",
    password: ""
  };

  const handleSubmit = async (values:PostData) => {
    const phone = values.phone_number.replace(/\D/g, "");
    const newFormData = { ...values, phone_number: phone };
    // console.log(values);
    const status = await postData(newFormData);
    if (status === 201) {
      handleClose();
    } else {
      handleClose();
    }
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className="py-2 px-6 text-white font-semibold bg-[#2389DA] hover:bg-blue-800 active:bg-[#2389DA] duration-200 rounded-lg"
      >
        Add a worker
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchemaWorkerAdd}
            onSubmit={handleSubmit}
          >
            <Form className="max-w-[600px] w-full flex flex-col gap-[12px]">
              <h1 className="text-center mb-2 text-[26px] font-bold">add a worker</h1>
              <Field
                as={TextField}
                label="Email"
                name="email"
                className="w-full mb-3"
              />
              <ErrorMessage name="email" component="p" className="mb-3 text-red-500 text-center" />
              <Field
                as={TextField}
                label="Age"
                name="age"
                type="number"
                className="w-full mb-3"
              />
              <ErrorMessage name="age" component="p" className="mb-3 text-red-500 text-center" />
             
              <Field
                as={TextField}
                label="First Name"
                name="first_name"
                className="w-full mb-3"
              />
              <ErrorMessage name="first_name" component="p" className="mb-3 text-red-500 text-center" />

              <Field
                as={RadioGroup}
                aria-label="gender"
                name="gender"
                className="flex items-center mb-3"
              >
                <div className="flex items-center justify-between">
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                </div>
              </Field>
              <ErrorMessage name="gender" component="p" className="mb-3 text-red-500 text-center" />

              <Field
                as={TextField}
                label="Last Name"
                name="last_name"
                className="w-full mb-3"
              />
              <ErrorMessage name="last_name" component="p" className="mb-3 text-red-500 text-center" />

              <Field
                as={TextField}
                label="Password"
                name="password"
                type="password"
                className="w-full mb-3"
              />
              <ErrorMessage name="password" component="p" className="mb-3 text-red-500 text-center" />


              <Field
                as={TextField}
                label="Telafono"
                type="tel"
                inputRef={inputRef}
                name="phone_number"
                className="w-full mb-3"
              />
              <ErrorMessage name="phone_number" component="p" className="mb-3 text-red-500 text-center" />
              
              <Button
                variant="contained"
                type="submit"
                className="w-full py-3"
              >
                add
              </Button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
