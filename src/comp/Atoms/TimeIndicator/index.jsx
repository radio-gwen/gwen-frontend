import { useState, useEffect } from "react"

    // Helper function to format time (e.g., 65 seconds -> 01:05)
    const formatTime = (timeInSeconds) => {
        if (isNaN(timeInSeconds)) return '00:00'
        const minutes = Math.floor(timeInSeconds / 60)
        const seconds = Math.floor(timeInSeconds % 60)
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
        }

const TimeIndicator = ({trackRef}) => {

    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)

    useEffect(() => {

        const audio = trackRef.current

        const updateTime = () => {
            setCurrentTime(audio.currentTime)
        }

        const updateDuration = () => {
            setDuration(audio.duration)
        }

        audio.addEventListener('timeupdate', updateTime)
        audio.addEventListener('loadedmetadata', updateDuration)

        return () => {
            audio.removeEventListener('timeupdate', updateTime)
            audio.removeEventListener('loadedmetadata', updateDuration)
        }
    }, [trackRef])

    return (
        <div className="time-indicator flex justify-between text-sm text-gray-600 mt-2">
            <span>{formatTime(currentTime)}/</span>
            <span>{formatTime(duration)}</span>
        </div>
    )
}

export default TimeIndicator