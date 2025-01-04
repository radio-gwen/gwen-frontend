import { useState } from "react";
import BtnCTA from "../BtnCTA";

const TestForm = () => {

    const [inputValue, setInputValue] = useState('');

    async function handleSubmit(e) {

        e.preventDefault();

        const formData = { mail: e.target["my_input"].value };

        const response = await fetch('http://localhost:8000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (response.ok) {
            alert('User added successfully');
        } else {
            alert('Failed to add user: ' + result.error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name='my_input'
                placeholder='Email address'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <BtnCTA btnContent='Invia!' />
        </form>
    );
}

export default TestForm;
