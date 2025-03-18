import axios from "axios"
import { useState } from "react"

import BtnCTA from "../../Atoms/BtnCTA"
import BtnPrimary from "../../Atoms/BtnPrimary"
import ImageBox from "../../Atoms/ImageBox"

// TODO replace local asset with dynamic ones
import defaultImage from "../../../assets/images/transmissions/simple80s.jpg"

const FormEventNew = () => {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [text, setText] = useState("")
    const [programType, setProgramType] = useState([])
    const [tracks, setTracks] = useState([])
    const [message, setMessage] = useState("")

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
            { trackTitle: "", trackDesc: "", trackDate: "" },
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create the request event data object
        const requestTransData = {
            event_title: title,
            event_desc: desc,
            event_text: text,
            event_label: programType.join(", "),
            //TODO Cancel the column id in transmission... using only id_old and rename it into id
            id: 1000,
        }


        try {
            const transResponse = await axios.post(
                "https://localhost:8000/api/events/",
                requestTransData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )

            const newEventId = transResponse.data.id_old

            // Create the tracks array of objects
            for (let track of tracks) {
                const requestTracksData = {
                    tracks_publication: "trans",
                    tracks_title: track.trackTitle,
                    tracks_desc: track.trackDesc,
                    tracks_img: "track_img", // Adjust or implement image upload later
                    tracks_type: "tracks_type", // Adjust as needed
                    tracks_date: track.trackDate || "2023-11-07",
                    tracks_label: null,
                    tracks_track: "trans128_track_01_15718.mp3",
                    transmission_id: newEventId, // Link to the event
                    deleted: false,
                };

                await axios.post(
                    "https://localhost:8000/api/tracks/",
                    requestTracksData,
                    { headers: { "Content-Type": "application/json" } }
                );
            }

            setMessage("Transmission and track posted successfully! :)")
        } catch (error) {
            console.log("Error:", error.response?.data);
            setMessage("Error creating transmission and track...")
        }
    }


    return(
        <form onSubmit={handleSubmit}>
            <div className="gap">                

                <ImageBox src={defaultImage} />
                <div className="space-medium"></div>
                <h2>Nuovo Evento</h2>

                <div className='flex-horiz'>
                    
                        
                        <input
                            type="checkbox"
                            name="programType"
                            value="Music"
                            checked={programType.includes("Music")}
                            onChange={(e) =>
                                handleProgramTypeChange(e, "Music")
                            }
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
                        
                        <div className="space-medium"></div>

                        <h2>Nuova Traccia</h2>
                        <div className="space-small"></div>

                        <input
                            placeholder="titolo traccia"
                            type="text"
                            value={track.trackTitle}
                            onChange={(e) =>
                                handleTrackChange(
                                    index,
                                    "trackTitle",
                                    e.target.value
                                )
                            }
                            required
                        />

                        <input
                            type="date"
                            value={track.trackDate}
                            onChange={(e) =>
                                handleTrackChange(
                                    index,
                                    "trackDate",
                                    e.target.value
                                )
                            }
                            required
                        />

                        <input
                            placeholder="descrizione traccia"
                            type="text"
                            value={track.trackDesc}
                            onChange={(e) =>
                                handleTrackChange(
                                    index,
                                    "trackDesc",
                                    e.target.value
                                )
                            }
                        />

                        
                    </span>
                ))}

                
                <div className='flex-horiz-right'>
                    <BtnCTA btnContent='Salva' onClick={handleSubmit}/>
                </div>

                {message && <p>{message}</p>}
            </div>
        </form>
    )
}

export default FormEventNew