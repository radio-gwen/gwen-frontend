import { useRef, useState } from "react"
import BtnPlayPause from "../../Atoms/BtnPlayPause"



const Player = ({id, track, desc}) => {

    const [isPlaying, setIsPlaying] = useState(false)
    const audioTrack = useRef(new Audio(track))

    const audioPlayer = () => {
        isPlaying ? audioTrack.current.pause() : audioTrack.current.play()
        setIsPlaying(!isPlaying)
    }

    return(
        <div className='player'>
            <BtnPlayPause isPlaying={isPlaying} onClick={() => {audioPlayer()}}/>
        </div>
    )
}

export default Player