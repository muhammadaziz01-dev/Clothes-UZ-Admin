import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import axios from "axios";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { getCookies } from "@coocse";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ dataId }: any) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /// my code start <-----------------------------
  const postMedia = async (data: any) => {
    try {
      const token = getCookies("token");
      const url = `http://store.go-clothes.uz:5555/v1/media/upload-photo?id=${data.id}`;
      const formData = new FormData();
      formData.append("file", data.upload_photo);

      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${token}`,
        },
      });
      // console.log(response);
      if (response.status === 200) {
        toast.success("Media uploaded successfully");
        handleClose();
      }
    } catch (error: any) {
      console.log(error);
      toast.error("Error : " + error?.message);
    }
  };

  const handleImageChange = async (event:any) => {
    const file = event.target.files[0];
    const data = {
      upload_photo: file,
      id: dataId,
    }
    postMedia(data)
  };

 

  // my code end <--------------------------------

  return (
    <div>
      <button onClick={handleOpen} className="text-gray-500">
        <AddPhotoAlternateIcon />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
          <div className=" flex flex-col gap-3 items-center">
            <input
              className="border py-3 w-full px-2 rounded-md"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {/* <button className="bg-bulu rounded-md py-3 w-full text-center  text-white font-bold ">
              Upload
            </button> */}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
