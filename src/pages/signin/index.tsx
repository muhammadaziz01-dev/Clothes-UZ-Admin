import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

import {auth} from "../../service/auth"
import {setCookies} from "@coocse"
import {schemaLogin} from "@validations"



import "./style.scss"

const index = () => {

   const navigate = useNavigate();
   const [showPassword, setShowPassword] = useState(false);


    interface initialValues {
        email: string;
        password: string;
    }
    const initialValues: initialValues = {
        email: "xasannosirov094@gmail.com" || "",
        password: "Sehtols@01" || "",
    };


   


  const  handelSubmit =async(values :initialValues)=>{
    try{
        const respons = await auth.signin(values);
        console.log(respons);
        if(respons.status ===200){
            setCookies("token",respons.data.access_token );
            toast.success("successfully logged in");
            setTimeout(()=>{navigate("/home");},1000)

        }
    }catch(error:any){
        toast.error("Error : " + error?.message);
        console.log(error);
    }
  }
    return <>
    
     
    <div className="login-wrp w-full h-[100vh] flex items-center justify-center">
        <div className=" py-10 px-20 rounded-tl-[30px] rounded-br-3xl shadow-[30px] bg-[rgba(250,250,250,0.35)]">
          <h1 className="text-center mb-5 text-[56px] font-bold">
            Log in
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={schemaLogin}
            onSubmit={handelSubmit}
          >
            <Form className=" w-[550px]   flex flex-col gap-[15px]">
              <Field
                as={TextField}
                label="Email"
                sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                type="email"
                name="email"
                className=" w-[100%] mb-3 outline-none py-0"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="mb-3 text-red-500 text-center"
              />

              <p
                onClick={() => {
                  alert("therefore, it should not be forgotten : ) ")
                  localStorage.clear();
                }}
                className="text-[20px] text-sky-500 ml-[70%] hover:text-sky-700 duration-200 cursor-pointer"
              >
                Forgot password?
              </p>

              <Field
                as={TextField}
                label="Parol"
                sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                type={showPassword ? "text" : "password"}
                name="password"
                className=" w-[100%] mb-3 outline-none py-0"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <ErrorMessage
                name="password"
                component="p"
                className="mb-3 text-red-500 text-center"
              />

              <Button
                sx={{ fontSize: "16px", fontWeight: "600", padding: "14px" }}
                variant="contained"
                type="submit"
                className="w-[100%] "
              >
                submit
              </Button>
            </Form>
          </Formik>
        </div>
      </div>
      <ToastContainer />

    </>};

export default index;