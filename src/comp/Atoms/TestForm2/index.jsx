import { useState } from "react"
import BtnCTA from "../BtnCTA"

const TestForm2 = () => {

    const [inputValues, setInputValues] = useState({
        title: '',
        desc: '',
        text: ''
    })

    const [image, setImage] = useState(null)

    const handleChange = (e) => {
        const { name, value } = e.target
        setInputValues((prevValues) => ({
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
        formData.append('title', inputValues.title);
        formData.append('desc', inputValues.desc);
        formData.append('text', inputValues.text);
    
        if (image) {
            formData.append('image', image);
        }
    
        try {
            const response = await fetch('http://localhost:8000/testtransmissions/upload', {
                method: 'POST',
                body: formData, // Do NOT set Content-Type manually
            });
    
            if (!response.ok) {
                const result = await response.json(); // If error response has JSON
                alert('Failed to add transmission: ' + (result.error || 'Unknown error'));
                return;
            }
    
            const result = await response.json();
            alert('Transmission added successfully');
            console.log(result);
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
                value={inputValues.title}
                onChange={handleChange}
            />
            <input
                    type="text"
                    name="desc"
                    placeholder='Transmission Description'
                    value={inputValues.desc}
                    onChange={handleChange}
            />
            <textarea 
                rows="5" 
                name="text" 
                value={inputValues.text}
                placeholder="Text Trasmissione"
                onChange={handleChange} >
            </textarea>
            <BtnCTA btnContent='Submit!' />
        </form>
    )
}

export default TestForm2
