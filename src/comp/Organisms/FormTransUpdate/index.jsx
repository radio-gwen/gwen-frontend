import axios from "axios"
import { useState, useEffect } from "react"
import ImageBox from "../../Atoms/ImageBox";

// TODO replace local asset with dynamic ones
import defaultImage from "../../../assets/images/transmissions/simple80s.jpg";

const FormTransUpdate = ({transmission}) =>  {

    const [title, setTitle] = useState(transmission?.transmission_title || "")
    const [desc, setDesc] = useState(transmission?.transmission_desc || "")
    const [text, setText] = useState(transmission?.transmission_text || "")
    const [tracks, setTracks] = useState([]);
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (transmission) {
            setTitle(transmission.transmission_title || "")
            setDesc(transmission.transmission_desc || "")
            setText(transmission.transmission_text || "")
        }
    }, [transmission])


    // Fetch tracks related to this transmission
    useEffect(() => {
        if (!transmission?.id_old) return; // Prevent fetching if id is undefined

        const fetchTracks = async () => {
            try {
                const response = await axios.get(
                    `https://localhost:8000/api/tracks/?transmission_id=${transmission.id_old}`
                );
                const filteredTracks = response.data.filter(
                    (track) => track.transmission_id === transmission.id_old
                );
                setTracks(filteredTracks);
            } catch (error) {
                console.error("Error fetching tracks:", error.response?.data || error.message);
            }
        };

        fetchTracks();
    }, [transmission?.id_old]);


    const handleSubmit = async (e) => {
        e.preventDefault()

        // Create the request data object
        const requestData = {
            transmission_title: title,  // No need for curly braces here
            transmission_desc: desc,
            transmission_text: text,
            //TODO Cancel the column id in transmission... using only id_old and rename it into id
            id: 1000,
        };

        try {
            const response = await axios.put(`https://localhost:8000/api/transmissions/${transmission.id_old}`, requestData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setMessage('Transmission updated successfully! :)');
            console.log('Response:', response.data);

        } catch (error) {
            console.log('Error:', error.response?.data);
            setMessage('Error creating transmission...');
        }
    };
    




    return(
        <form onSubmit = {handleSubmit}>

            <ImageBox src={defaultImage} />

            
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

                {/* Display fetched tracks */}
            <h3>Tracks</h3>
            {tracks.length > 0 ? (
                tracks.map((track, index) => (
                    <div key={track.id || index}>

                        <input
                            type="date"
                            value={track.tracks_date}
                            required
                        />

                        <input
                            placeholder="titolo traccia"
                            type="text"
                            value={track.tracks_title}
                            
                            required
                        />

                        <input
                            placeholder="descritioone traccia"
                            type="text"
                            value={track.tracks_desc}

                            required
                        />

                    </div>
                ))
            ) : (
                <p>No tracks available.</p>
            )}

                <button type="submit">Update Transmission</button>

                {message && <p>{message}</p>}

        </form>
    )
}

export default FormTransUpdate