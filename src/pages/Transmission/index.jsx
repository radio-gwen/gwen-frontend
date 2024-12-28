import { useParams } from "react-router-dom"
import Section from "../../comp/Templates/Section"
import Carousel from "../../comp/Mollecules/Carousel"
import Card from "../../comp/Organisms/Card"
import Toogle from "../../comp/Organisms/Toogle"
import Player from "../../comp/Mollecules/Player"

import { useFetch } from "../../utils/hooks/useFetch"


const Transmission = () => {

    const {transId} = useParams()

    const {data: transmissionsData, isLoading: isTransLoading} = useFetch(`http://localhost:8000/transmissions`)
    const transmissionsList = transmissionsData?.transmissionsList || []

    const {data: tracksData, isLoading: isTracksLoading} = useFetch(`http://localhost:8000/tracks`)
    const tracksList = tracksData?.tracksList || []
  
    if (isTransLoading) {
        return <div>Loading...</div>; // Add a loading indicator
    }

    if (isTracksLoading) {
        return <div>Loading...</div>; // Add a loading indicator
    }

    /*We look for the right object*/
    const transmission = transmissionsList.find((t) => t.id === String(transId))

    if (!transmission) {
        console.log('transmission not found!')
    }

    const tracks = tracksList.filter( (t) => t.mainId === 1234 && t.type === 'trans' )

    if (!tracks) {
        console.log('tracks not found!')
    }

    return(
       <Section>

            <Carousel image = {transmission.image} width= '300px'/>

            <Card
            title = {transmission.title}
            desc = {transmission.desc}
            text = {transmission.text}
            btnContent = 'Back'
            url = '/'
            />

            {tracks.map( (track) =>  
            
                <div>
                    <div className='line'></div>
                    <Toogle title={track.name} id={`track-${track.id}`}>
                        <Player track = {track.file}/>
                    </Toogle>
                </div>

            )}

            <div className="line"></div>



        </Section>
    )
}

export default Transmission