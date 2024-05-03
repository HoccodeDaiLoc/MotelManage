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
    // fetch(`https://noneedtoaskthereasonswhy.onrender.com/api/v1/plants/1`)
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
              <h1>{imgArray[0].title}</h1>
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
                <div className="button_show_all_img"></div>
              </div>
            </div>

            <div className="Info">
              <div className="Main_info">
                <div className="Room_info">
                  <div className="Room_title">
                    <div className="Room_title_main">{imgArray[0].title}</div>
                    <div className="Room_title_side">{imgArray[0].title}</div>
                  </div>
                  <div className="Room_Desc">
                  Thanh nhiệt, giải độc, khu phong trừ thấp, tiêu viêm. Rễ cây chữa gân xương đau nhức, mỏi lưng, mỏi gối, kinh nguyệt không đều, viêm túi mật, vàng da, vàng mắt. Dùng ngoài ngâm rửa trĩ, lòi dom. Lá cây chữa tăng huyết áp, khí hư bạch đới, Lá dùng ngoài trị vết thương, tắm ghẻ, chốc đầu. Hoa dùng trị ngứa.",                  </div>
                  <div className="Room_furniture_container">
                    <div className="Room_furniture_text">
                      Những tiện ích mà phòng trọ này mang lại:
                    </div>
                    <div className="Room_furniture">
                      <div className="icon_container">
                        <img
                          className="icon"
                          src={imgArray[0].thumbnailUrl}
                          alt=""
                        />
                      </div>
                      <div className="text">{imgArray[0].title}</div>
                    </div>
                    <div className="Room_furniture">
                      <div className="icon_container">
                        <img
                          className="icon"
                          src={imgArray[0].thumbnailUrl}
                          alt=""
                        />
                      </div>
                      <div className="text">{imgArray[0].title}</div>
                    </div>{" "}
                    <div className="Room_furniture">
                      <div className="icon_container">
                        <img
                          className="icon"
                          src={imgArray[0].thumbnailUrl}
                          alt=""
                        />
                      </div>
                      <div className="text">{imgArray[0].title}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="Side_info">
                <div className="Modal_container">
                  <Modal data={Images}></Modal>
                </div>
                <div className="Contact"></div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default RoomDetailContent;
