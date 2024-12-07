import { useState, useEffect } from "react"
import BtnPlayPause from "../../Atoms/BtnPlayPause"

function Player (){

    const [isPlaying, setIsPlaying] = useState(false)

    useEffect( () => {
        isPlaying && console.log('radio is playing')
    }, [isPlaying])

    return(
        <div className='block'>
            < BtnPlayPause 
            content = 'Ascolta la diretta!'
            isPlaying = {isPlaying}
            onClick={ () => setIsPlaying(!isPlaying)}
            />
        </div>
    )
}

export default Player