import DeleteIcon from '@mui/icons-material/Delete';
import {
  Table,
  Box,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableSortLabel,
  Paper,
  Skeleton,
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate , useSearchParams } from 'react-router-dom';

import {Props} from "@globol-interface";
import {CategorModalEdit ,WorkerModalEdit , MediaModaladd} from "@modals";
// import {category} from "@category"
// import{ ModalServicesEdit} from '@ui';



function index({ heders, body , skelatonLoader , deletIdData  }:Props) {

  const navigate = useNavigate();
  const [searchPaams] = useSearchParams();
  const page = Number(searchPaams.get("page")) || 1;
  const limit = Number(searchPaams.get("limit")) || 8;


  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <TableHead>
                <TableRow>
                  {
                    heders?.map((heder , index)=>{
                        return <TableCell key={index}>
                            <TableSortLabel>
                                {heder.title}
                            </TableSortLabel>
                        </TableCell>
                    })
                  }
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  skelatonLoader ? Array.from(new Array(5)).map((_, index)=>{
                    return <TableRow key={index}>
                      {
                        heders?.map((_, index2)=>{
                          return <TableCell key={index2}><Skeleton /></TableCell>
                        })
                      }
                    </TableRow>
                  })

                  : body?.map((body, index)=>{
                    return <TableRow key={index}>
                      {
                        heders?.map((heder, index2)=>{
                          return <TableCell key={index2}>{
                            heder.value == "action" ? <div className="flex items-center gap-2">
                                <button className=' text-gray-500' onClick={()=>deletIdData(body?.category_id)}><DeleteIcon/></button>
                                <CategorModalEdit  data={body}  />
                            </div>
                            :heder.value == "action1" ? <div className="flex items-center gap-2">
                                <button className=' text-gray-500' onClick={()=>deletIdData(body?.id)}><DeleteIcon/></button>
                                <WorkerModalEdit  data={body}  />
                            </div>
                            :heder.value == "action3" ? <div className="flex items-center gap-2">
                            <button className=' text-gray-500' onClick={()=>deletIdData(body?.product_id)}><DeleteIcon/></button>
                            <MediaModaladd  dataId={body?.product_id}  />
                            <button onClick={()=>{navigate(`/home/products/${body?.product_id}`)}}  className=' text-gray-500'><VisibilityIcon/></button>
                            </div>
                            : heder.value == "id" ? <input type="checkbox" onChange={()=>{}} />
                            : heder.value == "t/r" ? <p>{page * limit -(limit - 1) +index }</p>
                            : (body[heder.value])
                          }</TableCell>
                        })
                      }
                    </TableRow>
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </>
  );
}

export default index;
