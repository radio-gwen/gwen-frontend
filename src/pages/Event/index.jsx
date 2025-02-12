import { useParams } from "react-router-dom"
import { useFetch } from "../../utils/hooks/useFetch"

import Section from "../../comp/Templates/Section"
import Carousel from "../../comp/Mollecules/Carousel"
import Card from "../../comp/Organisms/Card"
import Toogle from "../../comp/Organisms/Toogle"
import Player from "../../comp/Mollecules/Player"

// TODO replace local assets with dynamics ones
import defaultImage from '../../assets/images/transmissions/simple80s.jpg'
import jingle from '../../assets/audio/jingle.mp3'


const Event = () => {

    const {eventId} = useParams()

    const {data: eventsData, isLoading: isEventLoading} = useFetch(`https://localhost:8000/api/events/`)

    const {data: tracksData, isLoading: isTracksLoading} = useFetch(`https://localhost:8000/api/tracks/`)
    

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
    const refEventId = event.id

    const tracks = tracksData.filter(track => 
        track.tracks_id?.toString().startsWith(refEventId.toString())
      )

    return (
        <Section>
            <h1>{event.event_title}</h1>
            <Carousel image={defaultImage} />
            <Card
            title = {event.event_title}
            desc = {event.event_desc}
            text = {event.text}
            label = {event.event_label}
            btnContent = 'Back'
            url = '/'
            />

            {tracks.map( (track) =>    
                <div>
                    <div className='line'></div>
                    <Toogle title={track.tracks_title} id={`track-${track.id}`}>
                        <p>{track.tracks_desc}</p>
                        <Player track = {jingle}/>
                    </Toogle>
                </div>
            )}

        </Section>
    )
}

export default Event

