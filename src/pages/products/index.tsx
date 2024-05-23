import { useEffect, useState } from "react";
import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {ProductModalAdd} from "@modals"
import { Table , GlobalPogination } from "@ui";
import  useProductStore from "@store-product"
import "./style.scss";

function index() {

  const navigate = useNavigate()
  const {  data, isLoader, getProduct, deleteProduct , totlCount} = useProductStore();
  const [change, setChange] = useState("")
  console.log(change);
  1
  const [parms , setParams] =useState({ page:1, limit:8 , name: change})
    
  const totleCuont2 = Math.ceil(totlCount / parms?.limit)

  // useEfects function <--------------------
  useEffect(() => {
    getProduct(parms);
  }, [parms, change]);
  
  useEffect(()=>{
    const params = new URLSearchParams(location.search);
    const page = params.get("page");
    const search = params.get("search");
    const searchString =  search ? search  : ""
    const pageNuber = page ? parseInt(page): 1;
    setParams(preParams=>({
       ...preParams,
        page:pageNuber,
        name:searchString
    }));
    setChange(searchString)
    
},[location.search]);
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-


//--- pagination tett mui <----
const changePage = (value:number)=>{
  setParams(preParams=>({
      ...preParams,
      page:value
  }));
}
//=-=-=-=-=-=-=-=-=-=-=-=--=--=-=-

const hendalChange = (e:any)=>{
  const search = e.target.value;
  setChange(search)
  setParams(preParams=>({
                 ...preParams,
                 search
  }))
  const searchParams = new URLSearchParams(location.search);
        searchParams.set("search", search)
        navigate (`?${searchParams}`)

}


  const theder = [
    { title: "S/N", value: "t/r" },
    { title: "Product Name", value: "product_name" },
    { title: "color", value: "color" },
    { title: "Size", value: "size" },
    { title: "Count", value: "count" },
    { title: "Cost", value: "cost" },
    { title: "Action", value: "action3" },
  ];
  return (
    <>
     <ToastContainer/>
      <div className="flex items-center justify-between py-3">
        <div className="w-96">
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              width: 400,
              alignItems: "center",
              display: "flex",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ "aria-label": "serch google maps" }}
              onChange={hendalChange}
              value={change}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
        <div className="flex items-center gap-2">
          <ProductModalAdd/>
        </div>
      </div>

      <Table heders={theder}  body={data} skelatonLoader={isLoader} deletIdData={deleteProduct}/> 

     
      <GlobalPogination totleCuont={totleCuont2} page={parms.page} setParams={changePage}/>
    </>
  );
}

export default index;
