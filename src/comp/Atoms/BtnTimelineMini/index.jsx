const BtnTimelineMini = ({trackRef}) => {

    const goBackward = () => {
        const audio = trackRef.current
        audio.currentTime = Math.max(0, audio.currentTime, -10)
    }

    const goForward = () => {
        const audio = trackRef.current
        audio.currentTime = Math.min(audio.duration, audio.currentTime + 30)
    }

    return(
        <div className="time-rew-forw">
            <span className="btn-timeline-mini" onClick={goBackward}>«</span>
            <span className="btn-timeline-mini" onClick={goForward}>»</span>
        </div>
    )
}

export default BtnTimelineMini