import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import BtnPlayPause from "../../Atoms/BtnPlayPause"

function Player ( {isMobile, isNavOpen, setIsNavOpen} ){

    const [isPlaying, setIsPlaying] = useState(false)

    useEffect( () => {
        const audio = document.querySelector('#stream')
        isPlaying ? audio.play() : audio.pause()
    }, [isPlaying])

    return(
        <div className='block' >
            <audio src="http://stream.radiojar.com/h6eddm4h9quvv" id="stream"></audio>
            < BtnPlayPause 
            content = 'Ascolta la diretta!'
            isPlaying = {isPlaying}
            onClick={ () => setIsPlaying(!isPlaying)}
            />

            {isMobile &&
            <div onClick={() => setIsNavOpen((prev) => !prev)}>
            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
          >
            <rect x="3" y="5" width="18" height="2" rx="1" />
            <rect x="3" y="11" width="18" height="2" rx="1" />
            <rect x="3" y="17" width="18" height="2" rx="1" />
          </svg>
                </div>
            }

        </div>
    )
}

export default Player