import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import useCategoryStore from "@store-categors"
import { Table , GlobalPogination} from "@ui"
import {CategorMadalAdd} from "@modals"
import "./style.scss"

function index() {
  const {isLoader , data , getData , deleteData ,totlCount } = useCategoryStore()
  

  const [parms , setParams] =useState({ page:1, limit:8 })
    
    const totleCuont2 = Math.ceil(totlCount / parms?.limit) 
  

// useEffects function <------------------------------
  useEffect(()=>{
    getData(parms)
  },[parms])

  useEffect(()=>{
    const params = new URLSearchParams(location.search);
    const page = params.get("page");
    const pageNuber = page ? parseInt(page): 1;
    setParams(preParams=>({
       ...preParams,
        page:pageNuber
    }));
    
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
 
  const theder = [
        {title: "" , value:"id"},
        {title: "S/N" , value:"t/r"},
        {title: "Category" , value:"category_name"},
        {title: "Action" , value:"action"}
  ]

  


  return <>
    <ToastContainer/>
    <div className="flex items-center justify-between py-3">
        <div className="w-96">
           {/* <Paper 
           component="form"
           sx={{p:"2px 4px", width:400 , alignItems: "center" , display: "flex"}}>
            <InputBase
             sx={{ml:1 , flex :1}}
             placeholder="Search"
             inputProps={{"aria-label":"serch google maps"}}/>
            <IconButton type="button" sx={{p: "10px"}} aria-label="search">
                <SearchIcon/>
            </IconButton>

           </Paper> */}
        </div>
        <div className="flex items-center gap-2">
          
         <CategorMadalAdd/>
        </div>
    </div>

    <Table heders={theder} body={data} skelatonLoader={isLoader} deletIdData={deleteData}/>

    <GlobalPogination totleCuont={totleCuont2} page={parms.page} setParams={changePage}/>
    
  </>
}

export default index