import { useState } from "react"
import BtnCTA from "../BtnCTA"

const TestForm2 = () => {

    const [transmissionValues, setTransmissionValues] = useState({
        title: '',
        desc: '',
        text: ''
    })

    const [image, setImage] = useState(null)

    const [trackValues, setTrackValues] = useState([{
        title: '',
        desc: '',
        date: '',
        file: ''
    }])

    const handleChange = (e) => {
        const { name, value } = e.target
        setTransmissionValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }))
        setTrackValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }))
    }

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0]
        setImage(selectedImage)
    }

    async function handleSubmit(e) {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('title', transmissionValues.title);
        formData.append('desc', transmissionValues.desc);
        formData.append('text', transmissionValues.text);

        const formTrackData = new FormData();
        formData.append('title', trackValues.title);
        formData.append('desc', trackValues.desc);
        formData.append('text', trackValues.date);
    
        if (image) {
            formData.append('image', image);
        }
    
        try {

            // Transmission Data Submission
            const transmissionResponse = await fetch('http://localhost:8000/testtransmissions', {
                method: 'POST',
                body: formData, // Do NOT set Content-Type manually
            });
    
            if (!transmissionResponse.ok) {
                const result = await transmissionResponse.json(); // If error response has JSON
                alert('Failed to add transmission: ' + (result.error || 'Unknown error'));
                return;
            }
    
            const result = await transmissionResponse.json();
            alert('Transmission added successfully');
            console.log(result);

            // Track Data submission
            const trackResponse = await fetch('http://localhost:8000/testtracks', {
                method: 'POST',
                body: formTrackData,
            })

            if(!trackResponse.ok) {
                const result = await trackResponse.json()
                alert('Failed to add track: ' + (result.error || 'Unknown error'))
                return
            }

            const trackResult = await trackResponse.json()
            alert('Tracks added successfully')
            console.log(trackResult);

            



        } catch (err) {
            console.error('Error:', err);
            alert('Failed to add transmission: ' + err.message);
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <input 
                type='file'
                accept=".jpg,.jpeg,.png"
                onChange={handleImageChange}
            />
            <input
                type="text"
                name='title'
                placeholder='Transmission Title'
                value={transmissionValues.title}
                onChange={handleChange}
            />
            <input
                type="text"
                name="desc"
                placeholder='Transmission Description'
                value={transmissionValues.desc}
                onChange={handleChange}
            />
            <textarea 
                rows="5" 
                name="text" 
                value={transmissionValues.text}
                placeholder="Text Trasmissione"
                onChange={handleChange} >
            </textarea>

            <input 
                type = 'text'
                name = 'track-title'
                placeholder = 'track name'
                value = {trackValues.title}
                onCHange = {handleChange} // Write onChange function
            />

            <BtnCTA btnContent='Submit!' />
        </form>
    )
}

export default TestForm2
