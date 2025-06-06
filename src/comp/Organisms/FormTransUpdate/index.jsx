import axios from "axios"
import { useState, useEffect, useRef } from "react"
import ImageBox from "../../Atoms/ImageBox"
import Toogle from "../Toogle"
import BtnCTA from "../../Atoms/BtnCTA"
import BtnPrimary from "../../Atoms/BtnPrimary"
import BtnIcon from '../../Atoms/BtnIcon'

import iconMusic from '../../../assets/images/icons/music'
// TODO replace local asset with dynamic ones
import defaultImage from "../../../assets/images/transmissions/simple80s.jpg"

//const API_URL = process.env.REACT_APP_API_URL

const FormTransUpdate = ({transmission}) =>  {
    const [title, setTitle] = useState(transmission?.transmission_title || "")
    const [desc, setDesc] = useState(transmission?.transmission_desc || "")
    const [text, setText] = useState(transmission?.transmission_text || "")
    const [deleted, setDeleted] = useState(false);
    const [existingTracks, setExistingTracks] = useState([]);  // Holds tracks from API
    const [newTracks, setNewTracks] = useState([]);  // Holds newly added tracks
    const [message, setMessage] = useState('')
    //const baseUrl = `https://${API_URL}/api/files/images?file_name`"="
    const baseUrl = "/files/images?file_name="
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(
        transmission?.transmission_img ? `${baseUrl}${transmission.transmission_img}` : defaultImage
    )
    const imageInputRef = useRef(null)
    const audioInputRefs = useRef([]);

    useEffect(() => {
        if (transmission) {
            setTitle(transmission.transmission_title || "")
            setDesc(transmission.transmission_desc || "")
            setText(transmission.transmission_text || "")
            setDeleted(transmission.deleted || false)
        }
    }, [transmission])


    // Fetch tracks related to this transmission
    useEffect(() => {
        if (!transmission?.id_old) return // Prevent fetching if id is undefined

        const fetchTracks = async () => {
            try {
                const response = await axios.get(
                    //`https://${API_URL}/api/tracks/?transmission_id=${transmission.id_old}`
                    `/?transmission_id=${transmission.id_old}`
                );
                const filteredTracks = response.data.filter(
                    (track) => track.transmission_id === transmission.id_old &&
                    track.tracks_publication === 'trans'
                );
                setExistingTracks(filteredTracks)
            } catch (error) {
                console.error("Error fetching tracks:", error.response?.data || error.message)
            }
        };

        fetchTracks();
    }, [transmission?.id_old])



    // Add a new (empty) track to the state
    const addTrack = () => {
        setNewTracks((prevTracks) => [
            ...prevTracks,
            { tracks_publication: "trans", tracks_title: "", tracks_desc: "", tracks_date: "", transmission_id: transmission.id_old, trackFile: null }, // Ensure transmission_id is set
        ])
    }

    const handleTrackChange = (index, field, value, isNewTrack) => {
        if (isNewTrack) {
            setNewTracks((prevTracks) => {
                const updatedTracks = [...prevTracks];
                updatedTracks[index] = { 
                    ...updatedTracks[index], 
                    [field]: field === "scheduleEnabled" ? value : value,
                    to_be_published_at: field === "scheduledDate" ? value : updatedTracks[index].to_be_published_at
                };
                return updatedTracks;
            });
        } else {
            setExistingTracks((prevTracks) => {
                const updatedTracks = [...prevTracks];
                updatedTracks[index] = { 
                    ...updatedTracks[index], 
                    [field]: field === "scheduleEnabled" ? value : value,
                    to_be_published_at: field === "scheduledDate" ? value : updatedTracks[index].to_be_published_at
                };
                return updatedTracks;
            });
        }
    };
    

    const handleNewTrackFileChange = (index, file) => {
        setNewTracks((prevTracks) => {
            const updatedTracks = [...prevTracks]
            updatedTracks[index] = { ...updatedTracks[index], trackFile: file }
            return updatedTracks
        })
    }

    const handleExistingTrackFileChange = (index, file) => {
        setExistingTracks((prevTracks) => {
            const updatedTracks = [...prevTracks]
            updatedTracks[index] = { ...updatedTracks[index], trackFile: file }
            return updatedTracks
        })
    }

    // Handle image file change
    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Get the selected file
        if (file) {
            setImage(file); // Set the image file to the state
            setImagePreview(URL.createObjectURL(file))
        }
    };

    const handleImageBoxClick = () => {
        imageInputRef.current.click() // Trigger file input click
    }

    // Function to trigger a file input click
    const triggerFileInput = (index = null, type = "image") => {
        if (type === "image") {
            imageInputRef.current.click();
        } else if (type === "audio" && audioInputRefs.current[index]) {
            audioInputRefs.current[index].click()
        }
    }

    const handleDeleteTrackChange = (index) => {
        setExistingTracks((prevTracks) => {
            const updatedTracks = [...prevTracks];
            updatedTracks[index] = {
                ...updatedTracks[index],
                deleted: !updatedTracks[index].deleted, // Toggle deleted state
            };
            return updatedTracks;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        let uploadedImagePath = null
        let uploadedNewTrackPaths = []

    // Step 1: Upload Image if selected
    if (image) {
        const imageFormData = new FormData();
        imageFormData.append('files', image); // Use 'files' as the field name, as expected by backend

        try {
            const uploadResponse = await axios.post(
                //`https://${API_URL}/api/files/images`
                "/api/files/images", // Ensure this is the correct API endpoint
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
    for (let track of newTracks) {
        if (track.trackFile) {
            const trackFormData = new FormData();
            trackFormData.append('files', track.trackFile); // Append the track file
            
            try {
                const trackUploadResponse = await axios.post(
                    //`https://${API_URL}/api/files/tracks`
                    "/api/files/tracks", // Ensure this is the correct API endpoint for MP3 files
                    trackFormData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
                uploadedNewTrackPaths.push(trackUploadResponse.data.uploaded_files[0]); // Store the file path for each track
            } catch (error) {
                console.error("Error uploading track:", error.response ? error.response.data : error);
                setMessage("Error uploading track...");
                return;
            }
        }
    }

    
        // Create the request data object for transmission update
        const requestData = {
            transmission_title: title,
            transmission_desc: desc,
            transmission_text: text,
            transmission_img: uploadedImagePath || transmission.transmission_img,
            deleted: deleted,
            id: 1000, // TODO: to be cancelled 
        }
    
        try {
            // Update the transmission
            //await axios.put(`https://${API_URL}/api/transmissions/${transmission.id_old}`, requestData, {
            await axios.put(`/api/transmissions/${transmission.id_old}`, requestData, {
                headers: { "Content-Type": "application/json" },
            })
    
            // Update existing tracks (PUT requests)
            const updatePromises = existingTracks.map(async (track, index) => {
                let uploadedTrackPath = track.tracks_track; // Keep existing path if no new file
            
                // Check if a new file was uploaded for this track
                if (track.trackFile) {
                    const trackFormData = new FormData();
                    trackFormData.append("files", track.trackFile)
            
                    try {
                        const trackUploadResponse = await axios.post(
                            //`https://${API_URL}/api/files/tracks`
                            "/api/files/tracks",
                            trackFormData,
                            { headers: { "Content-Type": "multipart/form-data" } }
                        );
                        uploadedTrackPath = trackUploadResponse.data.uploaded_files[0] // Get new file path
                    } catch (error) {
                        console.error("Error uploading track file:", error.response?.data || error)
                        setMessage("Error uploading track file...")
                        return;
                    }
                }
            
                // Now update the track with the new file path
                //return axios.put(`https://${API_URL}/api/tracks/${track.id}`,
                return axios.put(`/api/tracks/${track.id}`, 
                    {
                        ...track,
                        tracks_track: uploadedTrackPath, // Ensure the file path is updated
                        deleted: track.deleted,
                    },
                    { headers: { "Content-Type": "application/json" } }
                )
            })
    
            // Create new tracks (POST requests)
            const createPromises = newTracks.map((track, index) =>
                //axios.post(`https://${API_URL}/api/tracks/`,
                axios.post(`/api/tracks/`, 
                    {
                        ...track,
                        tracks_track: uploadedNewTrackPaths[index] || "",  // Assign the uploaded track path
                        to_be_published_at: track.to_be_published_at || null
                    },
                    {
                        headers: { "Content-Type": "application/json" },
                    })
            );
    
            // Execute all requests in parallel
            await Promise.all([...updatePromises, ...createPromises]);
    
            setMessage('Transmission and tracks updated successfully! 🎉')
    
        } catch (error) {
            console.error("Error updating data:", error.response?.data || error.message)
            setMessage('Error updating transmission or tracks...')
        }
    }
    




    return(
        <form onSubmit = {handleSubmit}>

            <ImageBox 
            src={imagePreview} 
            onClick={handleImageBoxClick} 
            />

            <div className='space-large'></div>
            <h2>Trasmissione</h2>

                {/* Image input */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange} // Handle image selection
                    ref={imageInputRef} // Connect input to useRef
                    style={{ display: "none" }} // Hide the input field
                />

                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                
                <input
                    type='text'
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    required
                />

                
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

            {/* Existing Tracks */}
           
 

            <BtnPrimary onClick={addTrack} content="+ traccia" />


            {/* New Tracks */}
            
            {newTracks.length > 0 &&
                newTracks.map((track, index) => (
                    <span key={`new-${index}`} className="gap">

                        
                        <div className="line"></div>
                        <h2>Nuova Traccia</h2>


                        <div className='flex-horiz pad-0'>
                            <BtnIcon 
                            icon={iconMusic}
                            onClick={() => triggerFileInput(index, "audio")}
                            />

                            <span>{newTracks[index]?.trackFile ? newTracks[index].trackFile.name : "No file selected"}</span>

                        </div>

                        <input 
                            ref={(el) => (audioInputRefs.current[index] = el)} // Assign ref dynamically
                            type="file" 
                            accept="audio/mp3" 
                            onChange={(e) => handleNewTrackFileChange(index, e.target.files[0])} 
                            style={{ display: "none" }} 
                        />

                        <input
                            type="date"
                            value={track.tracks_date}
                            onChange={(e) =>
                                handleTrackChange(index, "tracks_date", e.target.value, true)
                            }
                            required
                        />

                        <input
                            placeholder="Titolo traccia"
                            type="text"
                            value={track.tracks_title}
                            onChange={(e) =>
                                handleTrackChange(index, "tracks_title", e.target.value, true)
                            }
                            required
                        />

                        <input
                            placeholder="Descrizione traccia"
                            type="text"
                            value={track.tracks_desc}
                            onChange={(e) =>
                                handleTrackChange(index, "tracks_desc", e.target.value, true)
                            }
                            required
                        />

                        <label>
                            <input
                                type="checkbox"
                                checked={track.scheduleEnabled || false}
                                onChange={(e) => handleTrackChange(index, "scheduleEnabled", e.target.checked, true)}
                            />
                            Scheduling
                        </label>

                        {track.scheduleEnabled && (
                            <input
                                type="date"
                                value={track.to_be_published_at || ""}
                                onChange={(e) => handleTrackChange(index, "scheduledDate", e.target.value, true)}
                            />
                        )}

                    </span>
                ))}

                <div className='space-large'></div>

                <h2>Traccie Attuali</h2>
                {existingTracks.length > 0 ? (
                existingTracks
                    .filter(track => !track.to_be_published_at || new Date(track.to_be_published_at) < new Date())  // Filter out past tracks
                    .map((track, index) => (
                        <span key={track.id}>
                            <Toogle title={track.tracks_title}>
                                <span className="gap">

                                    <div className='flex-horiz pad-0'>
                                        <BtnIcon 
                                            icon={iconMusic}
                                            onClick={() => triggerFileInput(index, "audio")}
                                        />
                                        <span>{track.tracks_track}</span>
                                    </div>

                                    <input 
                                        ref={(el) => (audioInputRefs.current[index] = el)} // Assign ref dynamically
                                        type="file" 
                                        accept="audio/mp3" 
                                        onChange={(e) => handleExistingTrackFileChange(index, e.target.files[0])} 
                                        style={{ display: "none" }} 
                                    />

                                    <input
                                        type="date"
                                        value={track.tracks_date}
                                        onChange={(e) =>
                                            handleTrackChange(index, "tracks_date", e.target.value, false)
                                        }
                                        required
                                    />

                                    <input
                                        placeholder="Titolo traccia"
                                        type="text"
                                        value={track.tracks_title}
                                        onChange={(e) =>
                                            handleTrackChange(index, "tracks_title", e.target.value, false)
                                        }
                                        required
                                    />

                                    <input
                                        placeholder="Descrizione traccia"
                                        type="text"
                                        value={track.tracks_desc}
                                        onChange={(e) =>
                                            handleTrackChange(index, "tracks_desc", e.target.value, false)
                                        }
                                        required
                                    />

                                    {/* Scheduling Checkbox */}
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={track.to_be_published_at && new Date(track.to_be_published_at) > new Date()}
                                            onChange={(e) => handleTrackChange(index, "scheduleEnabled", e.target.checked, false)}
                                        />
                                        Scheduling
                                    </label>

                                    {/* Display the scheduling date if enabled */}
                                    {track.to_be_published_at && (
                                        <input
                                            type="date"
                                            value={track.to_be_published_at || ""}
                                            onChange={(e) => handleTrackChange(index, "to_be_published_at", e.target.value, false)}
                                        />
                                    )}

                                    {/* Delete checkbox */}
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={track.deleted || false}  // Use the 'deleted' field to control the checkbox state
                                            onChange={() => handleDeleteTrackChange(index)} // Call function to toggle 'deleted' flag
                                        />
                                        Delete
                                    </label>
                                </span>
                            </Toogle>

                            <div className="line"></div>
                        </span>
                    ))
            ) : (
                <p>Nessuna traccia per adesso...</p>
            )}

                <div className='flex-horiz-right'>
                    <BtnCTA btnContent='Salva' onClick={handleSubmit}/>
                </div>

                {message && <p>{message}</p>}

        </form>
    )
}

export default FormTransUpdate