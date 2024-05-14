import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { Button, TextField } from "@mui/material";
import { useMask } from "@react-input/mask";

import { validationSchemaWorkerEdit } from "@validations";
import useWorkerStore from "@store-worker";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalServicesEdit({ data }: any) {
  const { updateData } = useWorkerStore();
  const inputRef = useMask({mask: "+998 (93) ___-__-__",replacement: { _: /\d/ },});
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  interface InitialValues {
    email: string;
    first_name: string;
    gender: string;
    last_name: string;
    password: string;
    phone_number: string;
    access_token?: string;
    age?: number;
    id?: string;
    refresh_token?: string;
    
  }

  

  const initialValues: InitialValues = {
    email: data?.email || "",
    first_name: data?.first_name || "",
    gender: data?.gender || "",
    last_name: data?.last_name || "",
    password: "",
    phone_number: data?.phone_number || "",
    age: data?.age || 0,
    id: data?.id || "",
  };

  const handleSubmit = async (values: InitialValues) => {
    const phone = values.phone_number.replace(/\D/g, "");
    const newFormData = { ...values, phone_number: phone };
    const updatedData = { ...data, ...newFormData };
    const status = await updateData(updatedData);
    if (status === 200) {
      handleClose();
    } 
  };

  return (
    <div>
      <button onClick={handleOpen} className="text-slate-500">
        <EditIcon />
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
            validationSchema={validationSchemaWorkerEdit}
            onSubmit={handleSubmit}
          >
            <Form className="max-w-[1000px] w-full flex flex-col gap-[12px]">
              <h1 className="text-center mb-2 text-[26px] font-bold">Employee Replacement</h1>
              <div className="flex items-center gap-3">
              <div className="flex items-center flex-col gap-3 max-w-[400px] w-full">
                <Field
                as={TextField}
                label="Email"
                type="email"
                name="email"
                className="w-full mb-3"
              />
              <ErrorMessage name="email" component="p" className="mb-3 text-red-500 text-center" />

              <Field
                as={TextField}
                label="First Name"
                name="first_name"
                className="w-full mb-3"
              />
              <ErrorMessage name="first_name" component="p" className="mb-3 text-red-500 text-center" />

              <Field
                as={TextField}
                label="Last Name"
                name="last_name"
                className="w-full mb-3"
              />
              <ErrorMessage name="last_name" component="p" className="mb-3 text-red-500 text-center" />

              <Field
                as={TextField}
                label="Gender"
                name="gender"
                className="w-full mb-3"
              />
              <ErrorMessage name="gender" component="p" className="mb-3 text-red-500 text-center" />

              
              </div>
              <div className="flex items-center flex-col gap-3 max-w-[400px] w-full">
              <Field
                as={TextField}
                label="Phone Number"
                type="tel"
                inputRef={inputRef}
                name="phone_number"
                className="w-full mb-3"
              />
              <ErrorMessage name="phone_number" component="p" className="mb-3 text-red-500 text-center" />

              <Field
                as={TextField}
                label="Password"
                type="password"
                name="password"
                className="w-full mb-3"
              />
              <ErrorMessage name="password" component="p" className="mb-3 text-red-500 text-center" />

              
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
                label="ID"
                name="id"
                className="w-full mb-3"
              />
              <ErrorMessage name="id" component="p" className="mb-3 text-red-500 text-center" />

              
              </div>
              </div>
              <Button
                variant="contained"
                type="submit"
                className="w-full py-3"
              >
                Replacement
              </Button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
