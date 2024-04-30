import { useEffect, useState } from "react";
import RoomsContent from "./RoomsContent";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Modal from "./RoomDetailModal";
import Style from "../styles/RoomDetail.modules.scss";
function RoomDetailContent() {
  const params = useParams();
  // dùng để truyền giá trị các tham số trên URL, ở đây truyền vào RoomId
  const location = useLocation();
  // biến location chứa pathname
  const data = location.state;
  //lấy state dc truyền bởi roomcontent
  const [Images, SetImages] = useState([]);
  useEffect(() => {
    // fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${data.id}`)
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=1`)
      .then((respone) => respone.json())
      .then((data) => SetImages(data));
  }, []);

  let imgArray = Images.slice(0, 5);
  return (
    <div className="XD">
      {console.log(imgArray)}
      {imgArray.length === 5 && (
        <>
                  <div className="title_container">
                  <div className="title_container2">
                    <h2>{imgArray[0].id}</h2>
                  </div>
                </div>
        <div className="room_container">


          <div className="main">
            <div className="img_container">
              <div className="big_img_container">
                {imgArray[0] && (
                  <img className="big_img" src={imgArray[0].url} alt="" />
                )}
              </div>
              <div className="side_img_container">
                {imgArray.slice(1).map(
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
              <div className="button_show_all_img">
              <Modal data={Images}></Modal>
            </div>
            </div>

          </div>

          <div className="notmain">

            <div className="info"></div>
            <div className="contact"></div>
          </div>
        </div>
        </>
      )}
    </div>
  );
}
export default RoomDetailContent;
