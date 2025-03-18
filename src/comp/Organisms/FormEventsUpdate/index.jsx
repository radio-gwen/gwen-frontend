import axios from "axios"
import { useState, useEffect } from "react"
import ImageBox from "../../Atoms/ImageBox"
import Toogle from "../Toogle"
import BtnCTA from "../../Atoms/BtnCTA"
import BtnPrimary from "../../Atoms/BtnPrimary"

// TODO replace local asset with dynamic ones
import defaultImage from "../../../assets/images/transmissions/simple80s.jpg"

const FormEventsUpdate = ({event}) => {
    const [title, setTitle] = useState(event?.event_title || "")
    const [desc, setDesc] = useState(event?.event_desc || "")
    const [text, setText] = useState(event?.event_text || "")
    const [existingTracks, setExistingTracks] = useState([]);  // Holds tracks from API
    const [newTracks, setNewTracks] = useState([]);  // Holds newly added tracks
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (event) {
            setTitle(event.event_title || "")
            setDesc(event.event_desc || "")
            setText(event.transmission_text || "")
        }
    }, [event])

    // Fetch tracks related to this transmission
    useEffect(() => {
        if (!event?.id_old) return; // Prevent fetching if id is undefined

        const fetchTracks = async () => {
            try {
                const response = await axios.get(
                    `https://localhost:8000/api/tracks/?event_id=${event.id_old}`
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
            { tracks_publication: "event", tracks_title: "", tracks_desc: "", tracks_date: "", transmission_id: event.id_old }, // Ensure transmission_id is set
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


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Create the request data object for event update
        const requestData = {
            event_title: title,
            event_desc: desc,
            event_text: text,
            id: 1000, // TODO: Replace with the correct logic if needed
        }
    
        try {
            // Update the event
            await axios.put(`https://localhost:8000/api/events/${event.id_old}`, requestData, {
                headers: { "Content-Type": "application/json" },
            })
    
            // Update existing tracks (PUT requests)
            const updatePromises = existingTracks.map((track) =>
                axios.put(`https://localhost:8000/api/tracks/${track.id}`, track, {
                    headers: { "Content-Type": "application/json" },
                })
            );
    
            // Create new tracks (POST requests)
            const createPromises = newTracks.map((track) =>
                axios.post(`https://localhost:8000/api/tracks/`, track, {
                    headers: { "Content-Type": "application/json" },
                })
            )
    
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

            <ImageBox src={defaultImage} />

            <div className='space-large'></div>
            <h2>Evento</h2>

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