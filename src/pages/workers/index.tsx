import { useEffect, useState } from "react";
// import { IconButton, InputBase, Paper } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
import { ToastContainer } from "react-toastify";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import useWorkerStore from "@store-worker";
import { Table } from "@ui";
import { WorkerModalAdd } from "@modals";
import "./style.scss";

function index() {
  const [countPage , setCountPage] = useState(1);
  const [countLimit] = useState(5);
  const { isLoader, data, getData, deleteData , totlCount} = useWorkerStore();

  const allCount = Math.ceil(totlCount/ countLimit)
  // console.log(allCount);

  useEffect(() => {
    getData({ page: countPage, limit: countLimit });
  }, [countPage]);

  const theder = [
    { title: "", value: "id" },
    { title: "S/N", value: "t/r" },
    { title: "First Name", value: "first_name" },
    { title: "Last Name", value: "last_name" },
    { title: "Gender", value: "gender" },
    { title: "Age", value: "age" },
    { title: "Action", value: "action1" },
  ];

  return (
    <>
      <ToastContainer />
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
          <WorkerModalAdd />
        </div>
      </div>
      <Table
        heders={theder}
        body={data}
        skelatonLoader={isLoader}
        deletIdData={deleteData}
      />
      <div className="flex items-center justify-end gap-3">
      <button onClick={()=>{setCountPage(countPage - 1)}} disabled={countPage == 1} className="py-1 px-1 border rounded-lg hover:shadow-md active:shadow-sm duration-200 cursor-pointer "><ArrowLeftIcon/></button>
      <span className="text-[20px] text-center">{countPage}</span>
      <button onClick={()=>{setCountPage(countPage + 1)}} disabled={countPage == allCount}  className="py-1 px-1 border rounded-lg hover:shadow-md active:shadow-sm duration-200 cursor-pointer "><ArrowRightIcon/></button>
    </div>
    </>
  );
}

export default index;
