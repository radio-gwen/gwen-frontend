import { createContext, useContext, useState } from "react";

export const AudioContext = createContext()

export const AudioProvider = ({children}) => {

    const [isPlaying, setIsPlaying] = useState(false)

    const toggleIsPlaying = () => {
        setIsPlaying(isPlaying)
    }

    return(
        <AudioContext.Provider value={{isPlaying, toggleIsPlaying}}>
            {children}
        </AudioContext.Provider>
    )

}

export const useAudio = () => useContext(AudioContext)