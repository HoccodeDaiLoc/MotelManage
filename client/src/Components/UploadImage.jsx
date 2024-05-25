import { useState } from "react";

function UploadImage() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      {selectedImage && (
        <div>
          {/* Display the selected image */}
          <img
            alt="Selected Image"
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <br />
          {/* Button to remove the selected image */}
          <button onClick={() => setSelectedImage(null)}>Remove</button>
        </div>
      )}

      <br />

      {/* Input element to select an image file */}
      <input
        type="file"
        name="myImage"
        // Event handler to capture file selection and update the state
        onChange={(event) => {
          const file = event.target.files[0]; // Get the selected file

          // Check if a file is actually selected
          if (file) {
            setSelectedImage(file); // Update state only if a file is selected
          }
        }}
      />
    </>
  );
}

export default UploadImage;
