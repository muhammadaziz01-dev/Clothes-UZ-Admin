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


  // delete product <--------------------
  
  //=-=--=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-

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
          <div className="card flex flex-col items-center">
            <div className="w-[250px] ">
              <img src={img} alt={product?.description} />
            </div>
            <h2 className="text-[24px] text-slate-900 text-center py-2">
              {product?.product_name}
            </h2>
            
            <div className="flex items-center justify-center gap-8">
              <div>
                <p className="text-[20px] text-slate-600">
                  Made in: {product?.made_in}
                </p>
                <p className="text-[20px] text-slate-600">
                  Color: {product?.color}
                </p>
                <p className="text-[20px] text-slate-600">
                  Size: {product.size}
                </p>
                <p className="text-[20px] text-slate-600">
                  Count: {product?.count}
                </p>
              </div>
              <div>
                <p className="text-[20px] text-slate-600">
                  Cost: {product?.cost}$
                </p>
                <p className="text-[20px] text-slate-600">
                  Discount: {product?.discount}%
                </p>
                <p className="text-[20px] text-slate-600">
                  Age Range: {product?.age_min} - {product?.age_max}
                </p>
                <p className="text-[20px] text-slate-600">
                  For Gender: {product?.for_gender}
                </p>
              </div>
            </div>
            <p className="text-[20px] text-slate-600  py-2">{product?.description}</p>
            <div className="flex items-center gap-3">
              <button className=' text-gray-500' onClick={()=>{
                deleteProduct(id)
                navigation("/home/products")
                }}><DeleteIcon/></button>
              <MediaModaladd dataId={id}/>
              <ProductModalEdit dataEdit={dataEdit}  />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default index;
