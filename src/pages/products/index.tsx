import { useEffect, useState } from "react";
// import { IconButton, InputBase, Paper } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
import { ToastContainer } from "react-toastify";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import {ProductModalAdd} from "@modals"
import { Table } from "@ui";
import  useProductStore from "@store-product"
import "./style.scss";

function index() {

  const [countPage , setCountPage] = useState(1);
  const [countLimit] = useState(8);
  const {  data, isLoader, getProduct, deleteProduct , totlCount} = useProductStore();

  const allCount = Math.ceil(totlCount/ countLimit)
  // console.log(allCount);

  useEffect(() => {
    getProduct({ page: countPage, limit: countLimit , name:"" });
  }, [countPage]);


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
          {/* <Paper
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
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper> */}
        </div>
        <div className="flex items-center gap-2">
          <ProductModalAdd/>
        </div>
      </div>

      <Table heders={theder}  body={data} skelatonLoader={isLoader} deletIdData={deleteProduct}/> 

     
      <div className="flex items-center justify-end gap-3">
        <button
          onClick={() => {
            setCountPage(countPage - 1);
          }}
          disabled={countPage == 1}
          className="py-1 px-1 border rounded-lg hover:shadow-md active:shadow-sm duration-200 cursor-pointer "
        >
          <ArrowLeftIcon />
        </button>
        <span className="text-[20px] text-center">{countPage}</span>
        <button
          onClick={() => {
            setCountPage(countPage + 1);
          }}
          disabled={countPage == allCount}
          className="py-1 px-1 border rounded-lg hover:shadow-md active:shadow-sm duration-200 cursor-pointer "
        >
          <ArrowRightIcon />
        </button>
      </div>
    </>
  );
}

export default index;
