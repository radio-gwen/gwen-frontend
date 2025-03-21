import axios from "axios"
import { useState } from "react"
import { useRef } from "react";

import BtnCTA from "../../Atoms/BtnCTA"
import BtnPrimary from "../../Atoms/BtnPrimary"
import ImageBox from "../../Atoms/ImageBox"

// TODO replace local asset with dynamic ones
import defaultImage from "../../../assets/images/transmissions/simple80s.jpg"

const FormTransNew = () => {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [text, setText] = useState("")
    const [programType, setProgramType] = useState([])
    const [tracks, setTracks] = useState([])
    const [message, setMessage] = useState("")
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(defaultImage)
    const fileInputRef = useRef(null);

    const handleProgramTypeChange = (event, type) => {
        setProgramType((prev) =>
            prev.includes(type)
                ? prev.filter((t) => t !== type) // Remove if already selected
                : [...prev, type] // Add if not selected
        )
    }

    // Add a new (empty) track to the state
    const addTrack = () => {
        setTracks((prevTracks) => [
            ...prevTracks,
            { trackTitle: "", trackDesc: "", trackDate: "", trackFile: null }, // Add trackFile to track state
        ])
    }

    // Handle changes for a specific track input field
    const handleTrackChange = (index, field, value) => {
        setTracks((prevTracks) => {
            const updatedTracks = [...prevTracks]
            updatedTracks[index] = { ...updatedTracks[index], [field]: value }
            return updatedTracks;
        })
    }

    const handleTrackFileChange = (index, file) => {
        setTracks((prevTracks) => {
            const updatedTracks = [...prevTracks]
            updatedTracks[index] = { ...updatedTracks[index], trackFile: file }
            return updatedTracks;
        })
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage(file)
            setImagePreview(URL.createObjectURL(file))
        }
    }

    const handleImageBoxClick = () => {
        fileInputRef.current.click(); // Trigger file input click
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        let uploadedImagePath = null;
        let uploadedTrackPaths = [];
    
        // Step 1: Upload Image if selected
        if (image) {
            const imageFormData = new FormData();
            imageFormData.append('files', image); // Use 'files' as the field name, as expected by backend
    
            try {
                const uploadResponse = await axios.post(
                    "https://localhost:8000/api/files/images", // Ensure this is the correct API endpoint
                    imageFormData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
    
                uploadedImagePath = uploadResponse.data.uploaded_files[0]; 
            } catch (error) {
                console.error("Error uploading image:", error.response ? error.response.data : error);
                setMessage("Error uploading image...");
                return;
            }
        }

        // Step 2: Upload MP3 files for each track
        for (let track of tracks) {
            if (track.trackFile) {
                const trackFormData = new FormData();
                trackFormData.append('files', track.trackFile); // Append the track file
                
                try {
                    const trackUploadResponse = await axios.post(
                        "https://localhost:8000/api/files/tracks", // Ensure this is the correct API endpoint for MP3 files
                        trackFormData,
                        { headers: { "Content-Type": "multipart/form-data" } }
                    );
                    uploadedTrackPaths.push(trackUploadResponse.data.uploaded_files[0]); // Store the file path for each track
                } catch (error) {
                    console.error("Error uploading track:", error.response ? error.response.data : error);
                    setMessage("Error uploading track...");
                    return;
                }
            }
        }

        // Step 3: Create the transmission data
        const requestTransData = {
            transmission_title: title,
            transmission_desc: desc,
            transmission_text: text,
            transmission_label: programType.join(", "),
            transmission_img: uploadedImagePath || "", // Include uploaded image path if available
            id: 1000,
        };
    
        try {
            const transResponse = await axios.post(
                "https://localhost:8000/api/transmissions/",
                requestTransData,
                { headers: { "Content-Type": "application/json" } }
            );
    
            const newTransmissionId = transResponse.data.id_old;
    
            // Step 4: Post each track data
            for (let [index, track] of tracks.entries()) {
                const requestTracksData = {
                    tracks_publication: "trans",
                    tracks_title: track.trackTitle,
                    tracks_desc: track.trackDesc,
                    tracks_img: uploadedImagePath || "", // Use the uploaded image if available
                    tracks_type: "tracks_type",
                    tracks_date: track.trackDate || "2023-11-07",
                    tracks_label: null,
                    tracks_track: uploadedTrackPaths[index] || "", // Use the uploaded MP3 path for the track
                    transmission_id: newTransmissionId,
                    deleted: false,
                };
    
                await axios.post(
                    "https://localhost:8000/api/tracks/",
                    requestTracksData,
                    { headers: { "Content-Type": "application/json" } }
                );
            }
    
            setMessage("Transmission and track posted successfully! :)");
        } catch (error) {
            console.error("Error creating transmission and track:", error.response ? error.response.data : error);
            setMessage("Error creating transmission and track...");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="gap">                

            <div onClick={handleImageBoxClick} style={{ cursor: "pointer", display: "inline-block" }}>
                <ImageBox src={imagePreview}/>
            </div>

                <div className="space-medium"></div>
                <h2>Nuova Trasmissione</h2>

                {/* IMAGE UPLOAD */}
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    ref={fileInputRef} // Connect input to useRef
                    style={{ display: "none" }} // Hide the input field
                    />
                

                <div className='flex-horiz'>
                    <input
                        type="checkbox"
                        name="programType"
                        value="Music"
                        checked={programType.includes("Music")}
                        onChange={(e) => handleProgramTypeChange(e, "Music")}
                    />{" "}
                    <label>
                        Music
                    </label>
                        
                    <input
                        type="checkbox"
                        name="programType"
                        value="Talk"
                        checked={programType.includes("Talk")}
                        onChange={(e) => handleProgramTypeChange(e, "Talk")}
                    />{" "}
                    <label>
                        Talk
                    </label>
                </div>

                <input
                    placeholder="Titolo"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <input
                    placeholder="Descrizione"
                    type="text"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    required
                />

                <textarea
                    placeholder="Testo"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <BtnPrimary onClick={addTrack} content="+ traccia" />

                <div className="space-medium"></div>
                {tracks.map((track, index) => (
                    <span key={index} className="gap">
                        <div className="space-medium"></div>

                        <h2>Nuova Traccia</h2>
                        <div className="space-small"></div>

                        <input
                            placeholder="Titolo traccia"
                            type="text"
                            value={track.trackTitle}
                            onChange={(e) => handleTrackChange(index, "trackTitle", e.target.value)}
                            required
                        />

                        <input
                            type="date"
                            value={track.trackDate}
                            onChange={(e) => handleTrackChange(index, "trackDate", e.target.value)}
                            required
                        />

                        <input
                            placeholder="Descrizione traccia"
                            type="text"
                            value={track.trackDesc}
                            onChange={(e) => handleTrackChange(index, "trackDesc", e.target.value)}
                        />

                        {/* MP3 File Upload for Track */}
                        <input 
                            type="file" 
                            accept="audio/mp3" 
                            onChange={(e) => handleTrackFileChange(index, e.target.files[0])} 
                        />
                    </span>
                ))}

                <div className='flex-horiz-right'>
                    <BtnCTA btnContent='Salva' onClick={handleSubmit}/>
                </div>

                {message && <p>{message}</p>}
            </div>
        </form>
    );
};

export default FormTransNew;
