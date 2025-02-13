import axios from "axios"
import { useState } from "react"

const FormTransNew = () => {

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [text, setText] = useState('')
    const [message, setMessage] = useState('')

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
            const response = await axios.post("https://localhost:8000/api/transmissions/", requestData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setMessage('Transmission posted successfully! :)');
            console.log('Response:', response.data);

        } catch (error) {
            console.log('Error:', error.response?.data);
            setMessage('Error creating transmission...');
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

                <button type="submit">Create Transmission</button>

                {message && <p>{message}</p>}
        </form>
    )
}

export default FormTransNew