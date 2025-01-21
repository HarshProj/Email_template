import React from "react";
import { uploadImage } from "../services/api";

const ImageUploader = ({ onUpload }) => {
  const handleImageUpload = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    const response = await uploadImage(formData);
    onUpload(response.data.imageUrl);
  };

  return (
    <div>
      <label className="block font-medium mb-2">Upload Image</label>
      <input type="file" onChange={handleImageUpload} className="w-full border rounded p-2" />
    </div>
  );
};

export default ImageUploader;
