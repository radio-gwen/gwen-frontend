import axios from "axios"
import { useState, useEffect } from "react"

const FormTransUpdate = ({transmission}) =>  {

    const [title, setTitle] = useState(transmission?.transmission_title || "")
    const [desc, setDesc] = useState(transmission?.transmission_desc || "")
    const [text, setText] = useState(transmission?.transmission_text || "")
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (transmission) {
            setTitle(transmission.transmission_title || "")
            setDesc(transmission.transmission_desc || "")
            setText(transmission.transmission_text || "")
        }
    }, [transmission])

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

        // Debugging: Log the data before sending
        console.log("Sending data:", JSON.stringify(requestData, null, 2));

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

                <button type="submit">Update Transmission</button>

                {message && <p>{message}</p>}

        </form>
    )
}

export default FormTransUpdate