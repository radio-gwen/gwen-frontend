import { useState, useEffect } from "react"

const Timeline = ({trackRef}) => {

    const [progress, setProgress] = useState(0)

    useEffect (() => {
        const track = trackRef.current

        const updateProgress = () => {
            const currentTime = track.currentTime
            const duration = track.duration
            if (duration > 0){
                setProgress((currentTime/duration)*100)
            }
        }

        track.addEventListener('timeupdate', updateProgress)

        return () => {
            track.removeEventListener('timeupdate', updateProgress)
        }
    }, [trackRef])

    // Handle seeking when the user moves the slider
    const handleSeek = (e) => {
        const audio = trackRef.current
        const newTime = (e.target.value / 100) * audio.duration
        audio.currentTime = newTime
        setProgress(e.target.value)
    }

    return (
        <div className="fill-available">
            <input
                className='timeline'
                type='range'
                max='100'
                value={progress}
                onChange={handleSeek}
            />
        </div>
    )
}

export default Timeline