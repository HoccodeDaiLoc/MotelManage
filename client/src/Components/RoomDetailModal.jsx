import { useState } from "react";
import Style from "../styles/Modal.modules.scss";
function RoomDetailModal({ data }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleOutsideClick = (e) => {
    //dom  kiếm classname
    if (e.target.className === 'modal') {
        setShow(false);
    }
  };
  
  const imgArray=data;
  return (
    <div>
      <button onClick={handleShow}>Mở Modal</button>
      {show ? (
        <div className="modal" onClick={(e)=>handleOutsideClick(e)}>
          <div className="modal-content">
            <div className="img_container">
              <div className="big_img">
                {imgArray[0] && <img src={imgArray[0].url} alt="" />}
              </div>
              <div className="side_container">
                {imgArray.slice(1,10).map(
                  (
                    img,
                    index //array.slice(index) => tạo mảng mới từ index đó trở về sau
                  ) => (
                    <div key={index} className="small_img_container">
                      <img src={img.url} className="small_img" alt="" />
                    </div>
                  )
                )}
              </div>
            </div>
            <button onClick={handleClose}>Đóng</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default RoomDetailModal;
