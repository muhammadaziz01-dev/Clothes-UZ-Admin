import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Field, Formik, Form, ErrorMessage } from "formik";
import {
  Button,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { useEffect } from "react";

import useProductStore from "@store-product";
import useCategoryStore from "@store-categors";
import {validationSchemaProductAdd} from "@validations"

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const { postProduct } = useProductStore();
  const { data, getData } = useCategoryStore();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const initialValues: any = {
    age_max: "",
    age_min: "",
    category_id: "",
    color: "",
    cost: "",
    count: "",
    discount: "",
    for_gender: "",
    made_in: "",
    product_name: "",
    size: "",
    description: "",

  };

  

  useEffect(() => {
    getData({ page: 1, limit: 100 });
    setTimeout(() => {
      console.log(data);
    }, 1000);
  }, []);

  const handleSubmit = async (values: any) => {
    console.log(values);

    const newSize = values.size.split(/\s+/).filter((soz:any) => soz !== '');
    const newColor = values.color.split(/\s+/).filter((soz:any) => soz !== '');

    console.log(newColor);
    console.log(newSize);

    const newValue = {...values, color: newColor , size: newSize}
    

    const status = await postProduct(newValue);
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
        Add a product
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
            validationSchema={validationSchemaProductAdd}
            onSubmit={handleSubmit}
          >
            <Form className="max-w-[700px] w-full flex flex-col gap-[12px]">
              <h1 className="text-center mb-2 text-[26px] font-bold">
                add a product
              </h1>
              <div className="flex gap-3 w-full">
                <div className="flex flex-col gap-3">
                  <Field
                    as={TextField}
                    label="Age maximum"
                    sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                    type="number"
                    name="age_max"
                    className=" w-[100%]  mb-3 outline-none py-0"
                  />
                  <ErrorMessage
                    name="age_max"
                    component="p"
                    className="mb-3 text-red-500 text-center"
                  />
                  <Field
                    as={TextField}
                    label="age minimum"
                    sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                    type="number"
                    name="age_min"
                    className=" w-[100%]  mb-3 outline-none py-0"
                  />
                  <ErrorMessage
                    name="age_min"
                    component="p"
                    className="mb-3 text-red-500 text-center"
                  />
                  <Field
                    as="select"
                    name="category_id"
                    className="w-full  border py-5 rounded-md px-1 "
                  >
                    {data?.map((item) => (
                      <option key={item?.category_id} value={item?.category_id}>
                        {item?.category_name}
                      </option>
                    ))}
                  </Field>

                  <Field
                    as={TextField}
                    label="Color"
                    sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                    type="text"
                    name="color"
                    className=" w-[100%]  mb-3 outline-none py-0"
                  />
                  <ErrorMessage
                    name="color"
                    component="p"
                    className="mb-3 text-red-500 text-center"
                  />
                  <Field
                    as={TextField}
                    label="Cost"
                    sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                    type="number"
                    name="cost"
                    className=" w-[100%]  mb-3 outline-none py-0"
                  />
                  <ErrorMessage
                    name="cost"
                    component="p"
                    className="mb-3 text-red-500 text-center"
                  />
                  
                </div>
                <div className="flex flex-col gap-3">
                <Field
                    as={TextField}
                    label="Count"
                    sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                    type="number"
                    name="count"
                    className=" w-[100%]  mb-3 outline-none py-0"
                  />
                  <ErrorMessage
                    name="count"
                    component="p"
                    className="mb-3 text-red-500 text-center"
                  />
                  <Field
                    as={TextField}
                    label="Discount"
                    sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                    type="number"
                    name="discount"
                    className=" w-[100%]  mb-3 outline-none py-0"
                  />
                  <ErrorMessage
                    name="discount"
                    component="p"
                    className="mb-3 text-red-500 text-center"
                  />
                  
                  <Field
                    as="select"
                    name="made_in"
                    className="w-full border py-5 rounded-md px-1 "
                  >
                    {["Uzbekistan" , "China" , "Turkiy"  ].map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </Field>
                  <Field
                    as={RadioGroup}
                    aria-label="For gender"
                    name="for_gender"
                    className="flex items-center py-[10px]"
                  >
                    <div className="flex items-center justify-between">
                      <FormControlLabel
                        value="Male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="Female"
                        control={<Radio />}
                        label="Female"
                      />
                    </div>
                  </Field>
                  <ErrorMessage
                    name="for_gender"
                    component="p"
                    className="mb-3 text-red-500 text-center"
                  />
                  <Field
                    as={TextField}
                    label="Size"
                    sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                    type="text"
                    name="size"
                    className=" w-[100%]  mb-3 outline-none py-0 "
                  />
                  <ErrorMessage
                    name="size"
                    component="p"
                    className="mb-3 text-red-500 text-center"
                  />
                </div>
                
              </div>
              <Field
                    as={TextField}
                    label="Product name"
                    sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                    type="text"
                    name="product_name"
                    className=" w-[100%]  mb-3 outline-none py-0"
                  />
                  <ErrorMessage
                    name="product_name"
                    component="p"
                    className="mb-3 text-red-500 text-center"
                  />
              <Field
                    as={TextField}
                    label="Discription"
                    sx={{ "& textarea": { color: "#00000", fontSize: "20px" , length: "160px" } }}
                    type="text"
                    name="description"
                    className=" w-[100%] h-[60px]  mb-3 outline-none py-0"
                  />
                  <ErrorMessage
                    name="description"
                    component="p"
                    className="mb-3 text-red-500 text-center"
                  />
              <Button variant="contained" type="submit" className="w-full py-3">
                add
              </Button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
