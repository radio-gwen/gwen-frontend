import { useRef, useState } from "react"
import BtnPlayPause from "../../Atoms/BtnPlayPause"
import Timeline from "../../Atoms/Timeline"
import TimeIndicator from "../../Atoms/TimeIndicator"
import BtnTimelineMini from "../../Atoms/BtnTimelineMini"
import BtnIconShare from "../../Atoms/BtnIconShare"


const Player = ({id, track, desc}) => {

    const [isPlaying, setIsPlaying] = useState(false)
    const audioTrack = useRef(new Audio(track))

    const audioPlayer = () => {
        isPlaying ? audioTrack.current.pause() : audioTrack.current.play()
        setIsPlaying(!isPlaying)
    }

    return(
        <div className='player background-white'>
            
            <div className='flex-horiz'>
                <BtnPlayPause isPlaying={isPlaying} onClick={() => {audioPlayer()}}/>
                <Timeline trackRef = {audioTrack}/>
            </div>
            
            
                <BtnTimelineMini trackRef= {audioTrack} />
                <TimeIndicator trackRef = {audioTrack}/>
                <BtnIconShare url={`/track/${id}`}/>
            
            
        </div>
    )
}

export default Player