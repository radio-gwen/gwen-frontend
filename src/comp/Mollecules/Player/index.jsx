import { useState } from "react"
import BtnPlayPause from "../../Atoms/BtnPlayPause"



const Player = ({id, track, desc}) => {

    const [isPlaying, setIsPlaying] = useState(false)

    const audioPlayer = () => {
        setIsPlaying(!isPlaying)
    }

    return(
        <div className='player'>
            <BtnPlayPause isPlaying={isPlaying} onClick={() => {audioPlayer()}}/>
        </div>
    )
}

export default Player