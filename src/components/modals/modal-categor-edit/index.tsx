import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { Button, TextField } from "@mui/material";

import useCategoryStore from "@store-categors";

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

export default function ModalServicesEdit({ data }: any) {
  const { updateData } = useCategoryStore();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /// my code ----------------------------------------------------

  interface initialValues {
    category_name: string;
    category_id?: string;
  }

  const validationSchema = Yup.object().shape({
    category_name: Yup.string().required("Name is required")
  });

  const initialValues: initialValues = {
    category_name: "",
  };

  const handelSubmit = async (value: initialValues) => {
    const data2 = {...data, category_name: value.category_name}
    const status = await updateData(data2);
    if (status === 200) {
      toast.success("updated successfully")   
      handleClose();
    }else{
      toast.error("something went wrong") 
    }
  };

  //----------------------------------------------------------------

  return (
    <div>
      <button onClick={handleOpen} className=" text-slate-500">
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
            validationSchema={validationSchema}
            onSubmit={handelSubmit}
          >
            <Form className=" max-w-[600px]  w-full flex flex-col gap-[12px]">
              <h1 className="text-center mb-2 text-[26px] font-bold">
              The category you want to change
              </h1>
              <Field
                as={TextField}
                label={data?.category_name}
                placeholder={data?.category_name}
                sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                type="text"
                name="category_name"
                className=" w-[100%]  mb-3 outline-none py-0"
              />
              <ErrorMessage
                name="category_name"
                component="p"
                className="mb-3 text-red-500 text-center"
              />
              <Button
                sx={{ fontSize: "16px", fontWeight: "600" }}
                variant="contained"
                type="submit"
                className="w-[100%] py-3"
              >
                change
              </Button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
