import { useState, useEffect } from "react"
import BtnPlayPause from "../../Atoms/BtnPlayPause"

function Player (){

    const [isPlaying, setIsPlaying] = useState(false)

    useEffect( () => {
        const audio = document.querySelector('#stream')
        isPlaying ? audio.play() : audio.pause()
    }, [isPlaying])

    return(
        <div className='block'>
            <audio src="http://stream.radiojar.com/h6eddm4h9quvv" id="stream"></audio>
            < BtnPlayPause 
            content = 'Ascolta la diretta!'
            isPlaying = {isPlaying}
            onClick={ () => setIsPlaying(!isPlaying)}
            />
        </div>
    )
}

export default Player