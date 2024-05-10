import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
  } from "react-router-dom";

import App from "../App";
import {SignIn, SignUP, Arror, Home } from "@pages"
// import {Asosiy , Buyurtmalar , SMSMarketing , Mijozlar , Xizmatlar ,Sozlamalar} from "@pages"

const index = ()=>{
    const router = createBrowserRouter(
        createRoutesFromElements(
          <Route path="/" element={<App />}>
            <Route index element={<SignIn />} />
            <Route path="/signup" element={<SignUP />} />
            <Route path="/home/*" element={<Home />} >
                
            </Route>
            <Route path="*" element={<Arror />} />
            
          </Route>
        )
      );
      return <RouterProvider router={router} />;
}

export default index;