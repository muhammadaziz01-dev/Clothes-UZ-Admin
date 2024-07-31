import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {ProductModalAdd} from "@modals"
import { Table , GlobalPogination , GlobalSearch } from "@ui";
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
    setChange(searchString)
    setParams(preParams=>({
       ...preParams,
        page:pageNuber,
        name:searchString
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
          < GlobalSearch search={change}  hendelChange={hendalChange}/>
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
