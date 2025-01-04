import { useParams } from "react-router-dom"
import { useFetch } from "../../utils/hooks/useFetch"

import Section from "../../comp/Templates/Section"
import Carousel from "../../comp/Mollecules/Carousel"
import Card from "../../comp/Organisms/Card"
import Toogle from "../../comp/Organisms/Toogle"
import Player from "../../comp/Mollecules/Player"

import eventsList from "../../data/eventsList"

/* we find the right event object in the eventsList*/




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
            <Carousel image={''} />
            <Card
            title = {event.title}
            desc = {event.desc}
            text = {event.text}
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

        </Section>
    )
}

export default Event