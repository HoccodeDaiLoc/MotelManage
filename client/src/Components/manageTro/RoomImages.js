import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import './RoomImages.scss'

const RoomImages = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const images = location.state?.images || [];

  return (
    <div className="container mt-4">
      <h2>Ảnh chi tiết phòng</h2>
      <Button variant="secondary" onClick={() => navigate(-1)}>
        Quay lại
      </Button>
      {images.length > 0 ? (
        <Carousel interval={null} className="mt-3">
          {images.map((image, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={image.image.imageUrl}
                alt={`Slide ${index + 1}`}
                style={{ maxHeight: "600px", objectFit: "cover" }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <p>Không có hình ảnh để hiển thị</p>
      )}
    </div>
  );
};

export default RoomImages;
