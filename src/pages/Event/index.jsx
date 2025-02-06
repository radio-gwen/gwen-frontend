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

    const {data: eventsData, isLoading: isEventLoading} = useFetch(`http://localhost:8000/events`)
    const eventsList = eventsData?.eventsList || []

    const {data: tracksData, isLoading: isTracksLoading} = useFetch(`http://localhost:8000/tracks`)
    const tracksList = tracksData?.tracksList || []

    if (isEventLoading) {
        return <div>Loading...</div>; // Add a loading indicator
    }

    if (isTracksLoading) {
        return <div>Loading...</div>; // Add a loading indicator
    }

    const event = eventsList.find((t) => t.id === String(eventId))

    if (!event) {
        console.log('event not found!')
    }

    const tracks = tracksList.filter( (t) => t.mainId === String(eventId) && t.type === 'event' )

    return (
        <Section>
            <h1>{event.title}</h1>
            <Carousel image={defaultImage} />
            <Card
            title = {event.title}
            desc = {event.desc}
            text = {event.text}
            label = {event.label}
            btnContent = 'Back'
            url = '/'
            />

            {tracks.map( (track) =>    
                <div>
                    <div className='line'></div>
                    <Toogle title={track.name} id={`track-${track.id}`}>
                        <Player track = {jingle}/>
                    </Toogle>
                </div>
            )}

        </Section>
    )
}

export default Event