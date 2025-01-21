import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const Editor = () => {
  const [template, setTemplate] = useState(""); // Email layout HTML from backend
  const [fields, setFields] = useState({
    title: "Sample Title",
    content: "Sample Content",
    footer: "Sample Footer",
    imageUrl: "",
  });
  const [isUploading, setIsUploading] = useState(false); // Tracks image upload status

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  console.log(import.meta.env.VITE_BACKEND_URL);

  // Fetch email layout from the backend
  useEffect(() => {
    const fetchLayout = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/getEmailLayout`);
        setTemplate(response.data); // Set the fetched template
      } catch (error) {
        console.error("Error fetching email layout:", error);
      }
    };

    fetchLayout();
  }, []);

  // Handle field updates
  const handleFieldChange = (key, value) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  // Upload an image and update its URL
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    setIsUploading(true); // Start the loader
    try {
      const response = await axios.post(`${BACKEND_URL}/api/uploadImage`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFields((prev) => ({ ...prev, imageUrl: response.data.imageUrl }));
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setIsUploading(false); // Stop the loader
    }
  };

  // Render and download the email template
  const handleDownload = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/renderAndDownloadTemplate`, fields, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data], { type: "text/html" }));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "email-template.html");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Failed to render and download template:", error);
    }
  };

  // Only show the preview if template is fetched successfully
  const renderPreview = template ? (
    <div
      className="border p-4 rounded"
      dangerouslySetInnerHTML={{
        __html: template
          .replace("{{title}}", fields.title)
          .replace("{{content}}", fields.content)
          .replace("{{footer}}", fields.footer)
          .replace("{{imageUrl}}", fields.imageUrl || ""),
      }}
    />
  ) : (
    <p>Loading preview...</p>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Email Builder</h1>

      {/* Title Field */}
      <div className="mb-4">
        <label className="block font-medium">Title</label>
        <input
          type="text"
          value={fields.title}
          onChange={(e) => handleFieldChange("title", e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>

      {/* Content Field */}
      <div className="mb-4">
        <label className="block font-medium">Content</label>
        <ReactQuill
          value={fields.content}
          onChange={(value) => handleFieldChange("content", value)}
        />
      </div>

      {/* Footer Field */}
      <div className="mb-4">
        <label className="block font-medium">Footer</label>
        <input
          type="text"
          value={fields.footer}
          onChange={(e) => handleFieldChange("footer", e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>

      {/* Image Upload */}
      <div className="mb-4">
        <label className="block font-medium">Upload Image</label>
        <input type="file" onChange={handleImageUpload} className="mb-4" />
        {isUploading ? (
          <p>Uploading image...</p>
        ) : fields.imageUrl ? (
          <div className="mt-2">
            <img src={fields.imageUrl} alt="Uploaded" className="max-w-sm" />
          </div>
        ) : null}
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Download Template
      </button>

      {/* Preview */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Preview</h2>
        {renderPreview}
      </div>
    </div>
  );
};

export default Editor;
