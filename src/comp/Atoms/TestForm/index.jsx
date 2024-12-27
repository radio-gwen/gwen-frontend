import { useState } from "react"
import BtnCTA from "../BtnCTA"

const TestForm = () => {

    const [inputValue, setInputValue] = useState('')

    function handleSubmit (e) {
        e.preventDefault()
        alert(e.target['my_input'].value)
    }

    return(
        <form onSubmit={handleSubmit}>
            <input type="text" name='my_input' placeholder='Email address' value={inputValue} onChange={ (e) => setInputValue(e.target.value)}/>
            <BtnCTA btnContent='Invia!' onSubit={handleSubmit} />
        </form>
    )
}

export default TestForm