import { useEffect, useState } from "react";
import RoomsContent from "./RoomsContent";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Modal from "./RoomDetailModal";
import Style from "../styles/RoomDetail.modules.scss";
function RoomDetailContent() {
  const params = useParams(); // dùng để truyền giá trị các tham số trên URL, ở đây truyền vào RoomId
  const location = useLocation(); // biến location chứa pathname
  const data = location.state; //lấy state dc truyền bởi roomcontent
  const [devices, setDevices] = useState([]);
  const [Images, SetImages] = useState([]);

  const albumId = 1;

  useEffect(() => {
    const imagedata = data.roomImage;
    SetImages(imagedata);
    fetch(`http://localhost:8080/api/room/${data.roomId}`)
      .then((respone) => respone.json())
      .then((data) => setDevices(data.room.device));
  }, []);

  let imgArray = Images.slice(0, 5);

  return (
    <div className="XD">
      {console.log(imgArray)}
      {imgArray.length > 1 && (
        <>
          <div className="title_container">
            <div className="title_container2">
              <h1>Phòng số {data.roomNumber}</h1>
            </div>
          </div>
          <div className="room_container">
            <div className="main">
              <div className="img_container">
                <div className="big_img_container">
                  {imgArray[0] && (
                    <img
                      className="big_img"
                      src={imgArray[0].image.imageUrl}
                      alt=""
                    />
                  )}
                </div>
                <div className="side_img_container">
                  {imgArray.slice(1).map(
                    (
                      img,
                      index //array.slice(index) => tạo mảng mới từ index đó trở về sau
                    ) => (
                      <div key={index} className="small_img_container">
                        <img
                          src={img.image.imageUrl}
                          className="small_img"
                          alt=""
                        />
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
                    <div className="Room_title_main">{data.roomArea} m²</div>
                    <div className="Room_title_side">{data.price}vnđ/tháng</div>
                  </div>
                  <div className="Room_Desc">{data.description}</div>
                  <div className="Room_furniture_container">
                    <div className="Room_furniture_text">
                      Những tiện ích mà phòng trọ này mang lại:
                    </div>
                    {devices.map((device, index) => (
                      <div className="Room_furniture" key={index}>
                        <div className="icon_container">
                          <img
                            className="icon"
                            src={device.categoryId}
                            alt=""
                          />
                        </div>
                        {console.log("device", device)}
                        <div className="text">{device.deviceName}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="Side_info">
                <div className="Modal_container">
                  {console.log("data image : ", Images)}
                  <Modal roomNumber={data.roomNumber} data={Images}></Modal>
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
