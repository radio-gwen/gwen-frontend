import { useState } from "react"

const FormTransNewFiles = () => {

    const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    tracks_publication: "",
    tracks_title: "",
    tracks_desc: "",
    tracks_img: "",
    tracks_type: "",
    tracks_date: "",
    tracks_label: "",
    transmission_id: 2,
    deleted: true,
    id: 702,
    tracks_update_date: new Date().toISOString(),
  });

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadData = new FormData();
    files.forEach((file) => {
      uploadData.append('files', file); // FastAPI vuole 'files' ripetuto, importante la label files
    });

    try {
      // 1. Carica i file
      const uploadResponse = await fetch('https://localhost:8000/api/files/tracks', {
        method: 'POST',
        body: uploadData,
      });

      const uploadResult = await uploadResponse.json();
      console.log('Files uploaded:', uploadResult);

      // 2. Prepara il JSON con i nomi dei file
      const fileNames = uploadResult.uploaded_files.join(',');
      const finalPayload = { ...formData, tracks_track: fileNames };

      // 3. Invia la seconda chiamata
      const response = await fetch('https://localhost:8000/api/tracks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalPayload),
      });

      const result = await response.json();
      console.log('Track created:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', border: '1px solid #ddd' }}>
      <input type="file" multiple onChange={handleFileChange} />
      <input type="text" name="tracks_publication" placeholder="Publication" onChange={handleInputChange} />
      <input type="text" name="tracks_title" placeholder="Title" onChange={handleInputChange} />
      <input type="text" name="tracks_desc" placeholder="Description" onChange={handleInputChange} />
      <input type="text" name="tracks_type" placeholder="Type" onChange={handleInputChange} />
      <input type="date" name="tracks_date" onChange={handleInputChange} />
      <input type="text" name="tracks_label" placeholder="Label" onChange={handleInputChange} />
      <button type="submit">Upload & Create Track</button>
    </form>
  )
}

export default FormTransNewFiles