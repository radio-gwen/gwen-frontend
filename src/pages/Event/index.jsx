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

    const event = eventsList.find((t) => t.id === String(eventId))



    return (
        <Section>
            <h1>{event.title}</h1>
            <Carousel image={''} />
        </Section>
    )
}

export default Event