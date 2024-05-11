import { Outlet } from "react-router-dom";
import "./style.scss"

const index = () => {
    return (
        <div>
           <Outlet/>
        </div>
    );
};

export default index;