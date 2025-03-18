import { useParams } from "react-router-dom"
import { useFetch } from "../../utils/hooks/useFetch"

import Section from "../../comp/Templates/Section"
import Carousel from "../../comp/Mollecules/Carousel"
import Card from "../../comp/Organisms/Card"
import Toogle from "../../comp/Organisms/Toogle"
import Player from "../../comp/Mollecules/Player"

// TODO: Temporary local import for development purposes.
// Replace with dynamic track loading from the API once the front-end is integrated with the server.
import jingle from '../../assets/audio/jingle.mp3';
import defaultImage from '../../assets/images/transmissions/simple80s.jpg'



const Transmission = () => {

    const {transId} = useParams()

    const {data: transmissionsData, isLoading: isTransLoading} = useFetch(`https://localhost:8000/api/transmissions/`)

    const {data: tracksData, isLoading: isTracksLoading} = useFetch(`https://localhost:8000/api/tracks/`)
  
    if (isTransLoading) {
        return <div>Loading...</div>; // Add a loading indicator
    }

    if (isTracksLoading) {
        return <div>Loading...</div>; // Add a loading indicator
    }

    const transmission = transmissionsData.find((t) => t.id_old === Number(transId))

    if (!transmission) {
        console.log('transmission not found!')
    }

    // We look for the refTransmission id
    const refTransId = transmission.id_old

    const tracks = tracksData.filter(track => 
        track.transmission_id?.toString().startsWith(refTransId.toString()) &&
        track.tracks_publication === "trans"
    )

    if (!tracks) {
        console.log('tracks not found!')
    }


    return(
       <Section>

            <Carousel image = {defaultImage} width= '300px'/>

            <Card
            title = {transmission.transmission_title}
            desc = {transmission.transmission_desc}
            text = {transmission.transmission_text}
            btnContent = 'Back'
            url = '/'
            label = {transmission.transmission_label}
            />

            {tracks.map( (track) =>  
            
                <div>
                    <div className='line'></div>
                    <Toogle title={track.tracks_title} id={`track-${track.track_id}`}>
                    <p>{track.tracks_desc}</p>
                        <Player 
                        //TODO replace jingle with a dynamic track
                        track = {jingle}
                        id ={track.id}
                        />  
                    </Toogle>
                </div>

            )}

            <div className="line"></div>



        </Section>
    )
}

export default Transmission