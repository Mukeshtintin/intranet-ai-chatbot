import { useState } from "react";
import API from "../services/api";
import "../styles/UploadBox.css";

function UploadBox() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("file", file);

      const response = await API.post("/upload", formData);

      alert(response.data.message);
    } catch (error) {
      console.error(error);

      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-box">
      <div className="upload-header">
        <div className="upload-icon">↑</div>

        <div>
          <h2>Upload Documents</h2>

          <p>Add company PDFs, policies, SOPs, or files</p>
        </div>
      </div>

      <div className="upload-area">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        {file && (
          <div className="file-name">
            {file.name}
          </div>
        )}
      </div>

      <button onClick={handleUpload}>
        {loading ? "Uploading..." : "Upload File"}
      </button>
    </div>
  );
}

export default UploadBox;