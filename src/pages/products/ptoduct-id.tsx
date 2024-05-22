import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer } from "react-toastify";

import {MediaModaladd , ProductModalEdit} from "@modals"
import request from "../../service/config";
import useProductStore from "@store-product"; 
import "./style.scss"
function index() {
  const { getIdProduct , deleteProduct } = useProductStore();
  const navigation = useNavigate();
  const { id } = useParams();

  const [loader, setLoader] = useState(false);
  const [product, setProduct]: [any, any] = useState({});
  const [img, setImg] = useState("");

  const dataEdit = {...product , product_id:id}
  // product get <----------------------
  const respons = async () => {
    setLoader(true);
    try {
      const data = await getIdProduct(id);
      setProduct(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }

    setLoader(false);
  };
  //=-=-==-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-


  // get image <--------------------
  const getImg = async (id: string | undefined) => {
    try {
      const response: any = await request.get(`/media/${id}`);
      setImg(
        response?.data?.images[response?.data?.images.length - 1]?.image_url
      );
    } catch (err) {
      console.log(err);
    }
  };
  //=-=-==-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-


  useEffect(() => {
    getImg(id);
    respons();
  }, []);

  

  return (
    <>
    <ToastContainer/>
      {loader ? (
        <div className=" w-full h-[90vh] flex   items-center justify-center "> <div className="loader"></div></div>
      ) : (
        <div className=" w-full h-[80vh] flex items-center justify-center">
          <div className="flex items-center justify-center gap-[60px] ">

            <div className="w-[400px] h-full ">
              <img className="w-full h-ful" src={img} alt={product?.description} />
            </div>
            <div>
              <h2 className="text-[24px]  font-semibold text-slate-900 text-center py-1">
                  {product?.product_name}
              </h2>
              <p className="text-[20px] font-medium text-slate-600  py-1"><span className="border-b pb-1 font-semibold">Description :</span> {product?.description}</p>
                <p className="text-[20px] text-slate-600">
                  Made in: <span className=" test-[22px] font-semibold pb-1 border-b">{product?.made_in}</span>
                </p>
                <p className="text-[20px] font-medium text-slate-600">
                  Color: <span className={product?.color ? ` bg-[${product?.color}] px-3 ml-3 rounded-[50%] `: " px-3 ml-3 rounded-[50%]  "}></span>
                </p>
                <p className="text-[20px] font-medium text-slate-600">
                  Size: <span className=" ml-3 border-b pb-1 text-[20px] font-semibold "> {product.size} </span>
                </p>
                <p className="text-[20px] font-medium text-slate-600">
                  Count:<span className=" ml-3 border-b pb-1 text-[20px] font-semibold ">  {product?.count} </span>
                </p>

                <p className="text-[20px] font-medium text-slate-600">
                  Cost:  <span className=" ml-3 border-b pb-1 text-[20px] font-semibold ">  {product?.cost}$ </span>
                </p>
                <p className="text-[20px] font-medium text-slate-600">
                  Discount: <span className=" ml-3 border-b pb-1 text-[20px] font-semibold "> {product?.discount}% </span>
                </p>
                <p className="text-[20px] font-medium text-slate-600">
                  Age Range: <span className=" ml-3 border-b pb-1 text-[20px] font-semibold "> {product?.age_min} - {product?.age_max} </span>
                </p>
                <p className="text-[20px] font-medium text-slate-600">
                  For Gender: <span className=" ml-3 border-b pb-1 text-[20px] font-semibold "> {product?.for_gender} </span>
                </p>
                <div className="flex items-center gap-5 justify-end pt-4">
              <button className=' text-gray-500' onClick={()=>{
                deleteProduct(id)
                navigation("/home/products")
                }}><DeleteIcon/></button>
              <MediaModaladd dataId={id}/>
              <ProductModalEdit dataEdit={dataEdit}  />
            </div> 
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default index;


