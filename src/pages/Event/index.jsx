import { useParams } from "react-router-dom"
import { useFetch } from "../../utils/hooks/useFetch"
import { useNavigate } from "react-router-dom"

import Section from "../../comp/Templates/Section"
import Carousel from "../../comp/Mollecules/Carousel"
import Card from "../../comp/Organisms/Card"
import Toogle from "../../comp/Organisms/Toogle"
import Player from "../../comp/Mollecules/PlayerLine"
import H1 from '../../comp/Atoms/H1'

// TODO replace local assets with dynamics ones
import defaultImage from '../../assets/images/transmissions/simple80s.jpg'
//import jingle from '../../assets/audio/jingle.mp3'

//const API_URL = process.env.REACT_APP_API_URL

const Event = () => {

    const navigate = useNavigate()

    const {eventId} = useParams()

    //const {data: eventsData, isLoading: isEventLoading} = useFetch(`https://${API_URL}/api/events/`)
    const {data: eventsData, isLoading: isEventLoading} = useFetch(`/api/events/`)

    //const {data: tracksData, isLoading: isTracksLoading} = useFetch(`https://${API_URL}/api/tracks/`)
    const {data: tracksData, isLoading: isTracksLoading} = useFetch(`/api/tracks/`)
    

    if (isEventLoading) {
        return <div>Loading...</div>; // Add a loading indicator
    }

    if (isTracksLoading) {
        return <div>Loading...</div>; // Add a loading indicator
    }

    const event = eventsData.find((event) => event.id_old === Number(eventId))

    if (!event) {
        console.log('event not found!')
    }

    // We look for the refTransmission id
    const refEventId = event.id_old

    const tracks = tracksData.filter(track => 
        track.transmission_id?.toString().startsWith(refEventId.toString()) &&
        track.tracks_publication === "event"
      )

      const imageUrl = event?.event_img 
      //? `https://${API_URL}/api/files/images?file_name=${event.event_img}`
      ? `/api/files/images?file_name=${event.event_img}` 
      : defaultImage;

    return (
        <Section>
            <Carousel image = {imageUrl} width= '300px'/>

            <div className="line"></div>

            <H1 content={`${event.event_begining} — ${event.event_ending}`}/>

            <div className="line"></div>

            <Card
            title = {event.event_title}
            desc = {event.event_desc}
            text = {event.event_text}
            label = {event.event_label}
            btnContent = 'Back'
            onClick= {() => navigate(-1)}
            descBold={true}
            />

            {tracks.map( (track) =>    
                <div>
                    <div className='line'></div>
                    <Toogle title={track.tracks_title} id={`track-${track.id}`}>
                        <p>{track.tracks_desc}</p>
                        <Player 
                        //track = {`https://${API_URL}/api/files/tracks?file_name=${track.tracks_track}`}
                        track = {`/api/files/tracks?file_name=${track.tracks_track}`}
                        id ={track.id}
                        />  
                    </Toogle>
                </div>
            )}

        </Section>
    )
}

export default Event

