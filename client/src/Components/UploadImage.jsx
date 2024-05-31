import { useState } from "react";

function UploadImage() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      {selectedImage && (
        <div>
          <img
            alt="Selected Image"
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <br />
          <button onClick={() => setSelectedImage(null)}>Remove</button>
        </div>
      )}

      <br />
      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          const file = event.target.files[0];
          if (file) {
            setSelectedImage(file);
          }
        }}
      />
    </>
  );
}

export default UploadImage;
