import { useEffect  } from "react"
import { useNavigate , useParams } from "react-router-dom"

function index() {
    const navigation =  useNavigate();
    const {id} = useParams();
   
    useEffect(() =>{
        console.log(id)
    },[])


  return (
    <>
    <div className="flec flex-col ">
        <p onClick={()=>{navigation("/home/products")}}>prodacts</p>

        <h1>prodact id</h1>

    </div>
    </>
  )
}

export default index