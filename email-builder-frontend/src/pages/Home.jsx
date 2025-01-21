import React, { useState } from "react";
import Editor from "../components/Editor";
import ImageUploader from "../components/ImageUploader";

const Home = () => {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div className="container mx-auto p-6">
      <Editor />
      {/* <ImageUploader onUpload={(url) => setImageUrl(url)} /> */}
    </div>
  );
};

export default Home;
