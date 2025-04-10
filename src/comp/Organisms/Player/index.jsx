import { useState, useEffect } from "react";
import BtnPlayPause from "../../Atoms/BtnPlayPause";
import BtnIcon from "../../Atoms/BtnIcon";

import iconCross from "../../../assets/images/icons/cross";

function Player({ isMobile, isNavOpen, setIsNavOpen, audioSrc, setAudioSrc, trackPlaying, setTrackPlaying, isTrackSet }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false); // Track user interaction


    useEffect(() => {
        const audio = document.querySelector("#stream");
        if (!audio) return;

        if (isPlaying) {
            audio.play().catch((error) => console.error("Playback error:", error))
        } else {
            audio.pause()
        }
    }, [isPlaying])

    useEffect(() => {
        const audio = document.querySelector("#stream")
        if (!audio || !hasInteracted) return; // Prevent autoplay on first mount

        audio.load(); // Load new audio source

        if (isPlaying) {
            audio.play().catch((error) => console.error("Playback error:", error));
        }
    }, [audioSrc]); // Runs only when `audioSrc` updates

    const handlePlayPause = () => {
        setHasInteracted(true); // Mark that user has interacted
        setIsPlaying((prev) => !prev);
    };

    const audio = audioSrc || "http://stream.radiojar.com/h6eddm4h9quvv";
    const trackTitle = trackPlaying || 'Ascolta la diretta'

    return (
       
            <div className={`block-player background-black ${isTrackSet?'full':''}`} style={{position: 'sticky', top: '0', zIndex: '1000'}}>
                
                <audio src={audio} id="stream"></audio>
                {trackPlaying ?       
                null
                : <BtnPlayPause 
                content={trackTitle}
                isPlaying={isPlaying}
                onClick={handlePlayPause}
            />}

                {trackPlaying ?
                    <BtnPlayPause 
                    content={trackTitle}
                    isPlaying={isPlaying}
                    onClick={handlePlayPause}
                    />
                : null} 

                {trackPlaying ? 
                    <BtnIcon 
                    icon={ iconCross } 
                    isNeg={true}
                    onClick={() => {
                        setTrackPlaying(false)
                        setAudioSrc("http://stream.radiojar.com/h6eddm4h9quvv")
                        
                    }}
                    /> 
                :  null}

                
                

                {isMobile && (
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
                )}
            </div>
    
    );
}

export default Player;
