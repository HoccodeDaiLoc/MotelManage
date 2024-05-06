import { useState } from "react";
import Style from "../styles/Modal.modules.scss";
function RoomDetailModal({ data }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleOutsideClick = (e) => {
    //dom  kiếm classname

    if (e.target.className === 'modal_me') {
        setShow(false);
    }
  };
  const check=()=>{
    if(show===true){
      document.body.style.overflow = 'hidden';
    }
    else{
      document.body.style.overflow = 'auto';

    }
  }
  const imgArray=data;
  check();
  return (
    <div>
      <button className="button_modal" onClick={handleShow}>Xem chi tiết</button>
     {console.log(show)}
      {show ? (
        <div className="modal_me" onClick={(e)=>handleOutsideClick(e)}>
          <div className="modal-content">
            <div className="img_container">
              <div className="big_img_container">
                {imgArray[0] && <img className="big_img" src={imgArray[0].url} alt="" />}
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
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default RoomDetailModal;
