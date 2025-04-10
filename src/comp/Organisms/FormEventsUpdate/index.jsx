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

const FormEventsUpdate = ({event}) => {
    const [title, setTitle] = useState(event?.event_title || "")
    const [desc, setDesc] = useState(event?.event_desc || "")
    const [text, setText] = useState(event?.event_text || "")
    const [beginingDate, setBeginingDate] = useState(event?.event_begining || "")
    const [endingDate, setEndingDate] = useState(event?.event_ending || "")
    const [existingTracks, setExistingTracks] = useState([]);  // Holds tracks from API
    const [newTracks, setNewTracks] = useState([]);  // Holds newly added tracks
    const [message, setMessage] = useState('')
    //const baseUrl = `https://${API_URL}/api/files/images?file_name=`
    const baseUrl = "/api/files/images?file_name="
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(
        event?.event_img ? `${baseUrl}${event.event_img}` : defaultImage
    )
    const imageInputRef = useRef(null)
    const audioInputRefs = useRef([]);

    useEffect(() => {
        if (event) {
            setTitle(event.event_title || "")
            setDesc(event.event_desc || "")
            setText(event.event_text || "")
            setBeginingDate(event.event_begining || "")
            setEndingDate(event.event_ending || "")
        }
    }, [event])

    // Fetch tracks related to this transmission
    useEffect(() => {
        if (!event?.id_old) return // Prevent fetching if id is undefined

        const fetchTracks = async () => {
            try {
                const response = await axios.get(
                    //`https://${API_URL}/api/tracks/?event_id=${event.id_old}`
                    `/api/tracks/?event_id=${event.id_old}`
                );
                const filteredTracks = response.data.filter(
                    (track) => track.transmission_id === event.id_old &&
                    track.tracks_publication === 'event'
                );
                setExistingTracks(filteredTracks)
            } catch (error) {
                console.error("Error fetching tracks:", error.response?.data || error.message)
            }
        }

        fetchTracks();
    }, [event?.id_old])


    // Add a new (empty) track to the state
    const addTrack = () => {
        setNewTracks((prevTracks) => [
            ...prevTracks,
            { tracks_publication: "event", tracks_title: "", tracks_desc: "", tracks_date: "", transmission_id: event.id_old, trackFile: null },
        ])
    }

    // Handle changes for a specific track input field
    const handleTrackChange = (index, field, value, isNewTrack) => {
        if (isNewTrack) {
            setNewTracks((prevTracks) => {
                const updatedTracks = [...prevTracks]
                updatedTracks[index] = { ...updatedTracks[index], [field]: value }
                return updatedTracks;
            })
        } else {
            setExistingTracks((prevTracks) => {
                const updatedTracks = [...prevTracks];
                updatedTracks[index] = { ...updatedTracks[index], [field]: value }
                return updatedTracks
            })
        }
    }

    const handleNewTrackFileChange = (index, file) => {
        setNewTracks((prevTracks) => {
            const updatedTracks = [...prevTracks]
            updatedTracks[index] = { ...updatedTracks[index], trackFile: file }
            return updatedTracks;
        })
    }

    /*
    const handleExistingTrackFileChange = (index, file) => {
        setExistingTracks((prevTracks) => {
            const updatedTracks = [...prevTracks]
            updatedTracks[index] = { ...updatedTracks[index], trackFile: file }
            return updatedTracks;
        })
    }
    */

    // Handle image file change
    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Get the selected file
        if (file) {
            setImage(file); // Set the image file to the state
            setImagePreview(URL.createObjectURL(file))
        }
    };

    const handleImageBoxClick = () => {
        imageInputRef.current.click(); // Trigger file input click
    }

    // Function to trigger a file input click
    const triggerFileInput = (index = null, type = "image") => {
        if (type === "image") {
            imageInputRef.current.click();
        } else if (type === "audio" && audioInputRefs.current[index]) {
            audioInputRefs.current[index].click()
        }
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
                    //`https://${API_URL}/api/files/image`,
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
                        //`https://${API_URL}/api/files/tracks`,
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


        // Create the request data object for event update
        const requestData = {
            event_title: title,
            event_desc: desc,
            event_text: text,
            event_begining: beginingDate,
            event_ending: endingDate,
            event_img: uploadedImagePath || event.event_img,
            id: 1000, // TODO: to be cancelled 
        }
    
        try {
            // Update the event
            //await axios.put(`https://${API_URL}/api/events/${event.id_old}`, requestData, {
            await axios.put(`/api/events/${event.id_old}`, requestData, {
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
                            //`https://${API_URL}/api/files/tracks`,
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
                    },
                    { headers: { "Content-Type": "application/json" } }
                );
            })
    
            // Create new tracks (POST requests)
            const createPromises = newTracks.map((track, index) =>
                //axios.post(`https://${API_URL}/api/tracks/`, 
                axios.post(`/api/tracks/`, 
                    {
                        ...track,
                        tracks_track: uploadedNewTrackPaths[index] || ""  // Assign the uploaded track path
                    },
                    {
                        headers: { "Content-Type": "application/json" },
                    })
            );
    
            // Execute all requests in parallel
            await Promise.all([...updatePromises, ...createPromises]);
    
            setMessage('Event and tracks updated successfully! 🎉')
    
        } catch (error) {
            console.error("Error updating data:", error.response?.data || error.message)
            setMessage('Error updating transmission or tracks...')
        }
    }


    return(
        <form onSubmit = {handleSubmit}>

            <div onClick={handleImageBoxClick} style={{ cursor: "pointer", display: "inline-block" }}>
                <ImageBox src={imagePreview} />
            </div>

            <div className='space-large'></div>
            <h2>Evento</h2>

                {/* Image input */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange} // Handle image selection
                    ref={imageInputRef} // Connect input to useRef
                    style={{ display: "none" }} // Hide the input field
                />

                <input 
                    type='date'
                    value={beginingDate}
                    onChange={(e) => setBeginingDate(e.target.value)}
                />

                <input 
                    type='date'
                    value={endingDate}
                    onChange={(e) => setEndingDate(e.target.value)}
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

                    </span>
                ))}

                <div className='space-large'></div>

                <h2>Traccie Attuali</h2>
            {existingTracks.length > 0 ? (
                existingTracks.map((track, index) => (
                    <span>
                    <Toogle title={track.tracks_title} key={track.id} >
                        <span  className="gap">

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
                            onChange={(e) => handleNewTrackFileChange(index, e.target.files[0])} 
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

                            
                        </span>
                    </Toogle>

                    <div className="line"></div>
                    </span>

                ))
            ) : (
                <p>Nessuna traccia per adesso... </p>
            )}

                <div className='flex-horiz-right'>
                    <BtnCTA btnContent='Salva' onClick={handleSubmit}/>
                </div>

                {message && <p>{message}</p>}

        </form>
    )
}

export default FormEventsUpdate