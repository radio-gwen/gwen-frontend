import axios from "axios"
import { useState } from "react"

const FormTransNew = () => {

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [text, setText] = useState('')

    
    const [tracks, setTracks] = useState([{ 
        trackTitle: '', 
        trackDesc: '', 
        trackDate: '' 
        }]);

    const [message, setMessage] = useState('')

        // Add a new (empty) track to the state
    const addTrack = () => {
        setTracks(prevTracks => [
        ...prevTracks,
        { trackTitle: '', trackDesc: '', trackDate: '' }
        ]);
    };

        // Handle changes for a specific track input field
    const handleTrackChange = (index, field, value) => {
        setTracks(prevTracks => {
        const updatedTracks = [...prevTracks];
        updatedTracks[index] = { ...updatedTracks[index], [field]: value };
        return updatedTracks;
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault()

        // Create the request transition data object
        const requestTransData = {
            transmission_title: title,  // No need for curly braces here
            transmission_desc: desc,
            transmission_text: text,
            //TODO Cancel the column id in transmission... using only id_old and rename it into id
            id: 1000,
        };



        // Debugging: Log the data before sending
        //console.log("Sending data:", JSON.stringify(requestData, null, 2));

        try {
            const transResponse = await axios.post("https://localhost:8000/api/transmissions/", requestTransData, {
                headers: {
                    "Content-Type": "application/json",
                }, 
            });

            console.log('Response:', transResponse.data);

            const newTransmissionId = transResponse.data.id_old

            // We  cretae the tracks Array of objects
            for (let track of tracks) {
                const requestTracksData = {
                  tracks_publication: 'trans',
                  tracks_title: track.trackTitle,
                  tracks_desc: track.trackDesc,
                  tracks_img: 'track_img',       // adjust or implement image upload later
                  tracks_type: 'tracks_type',    // adjust as needed
                  tracks_date: track.trackDate || "2023-11-07",
                  tracks_label: null,
                  tracks_track: '',
                  transmission_id: newTransmissionId, // Link to the transmission
                  deleted: false,
                };
        
                const trackResponse = await axios.post(
                  "https://localhost:8000/api/tracks/",
                  requestTracksData,
                  { headers: { "Content-Type": "application/json" } }
                );
                console.log("Track response:", trackResponse.data);
              }
        
              setMessage('Transmission and track posted successfully! :)');
            } catch (error) {
              console.log('Error:', error.response?.data);
              setMessage('Error creating transmission and track...');
            }
          };
        

    return(
        <form onSubmit={handleSubmit}>
            <label>Title:</label>
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <label>Description:</label>
                <input
                    type='text'
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    required
                />

                <label>Text:</label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <button onClick={addTrack}>Add Track</button>

                <h2>Tracks</h2>

                {tracks.map((track, index) => (
                    <div key={index} className="track-fields">
                    <label>Track Title:</label>
                    <input
                        type="text"
                        value={track.trackTitle}
                        onChange={(e) => handleTrackChange(index, "trackTitle", e.target.value)}
                        required
                    />

                    <label>Track Description:</label>
                    <input
                        type="text"
                        value={track.trackDesc}
                        onChange={(e) => handleTrackChange(index, "trackDesc", e.target.value)}
                    />

                    <label>Track Date:</label>
                    <input
                        type="date"
                        value={track.trackDate}
                        onChange={(e) => handleTrackChange(index, "trackDate", e.target.value)}
                        required
                    />
                    </div>
                ))}

                <button type="submit">Create Transmission</button>

                {message && <p>{message}</p>}
        </form>
    )
}

export default FormTransNew