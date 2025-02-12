import { useState } from "react"
import { useFetch } from "../../utils/hooks/useFetch"

import Section from "../../comp/Templates/Section"
import CardTransmission from "../../comp/Organisms/CardTransmission"
import TagSelector from "../../comp/Mollecules/TagSelector"
import H1 from "../../comp/Atoms/H1"

//TODO Replace local asset with dynamics ones
import defaultImage from '../../assets/images/transmissions/simple80s.jpg'

const Events = () => {

    const {data: eventsData, isLoading: isEventLoading} = useFetch(`https://localhost:8000/api/events/`)

    const [activeTags, setActiveTags] = useState([])

    if (isEventLoading) {
        return <div>Loading...</div>; // Add a loading indicator
    }

    return(
        <Section className="background-white">
            <H1 content='Eventi' />
            <div className='line'></div>
            <TagSelector 
                activeTags={activeTags} 
                setActiveTags={setActiveTags}
            />
            <div className='flex-grid'>
                    {eventsData.map( event => {
                        const isActive = !(activeTags.length > 0 && !activeTags.includes(event.event_label))
                        return(
                        <CardTransmission 
                        title={event.event_title}
                        url={`/transmission/${event.event_id_old}`} 
                        isActive={isActive}
                        image = {defaultImage}
                        />)}
                    )}
                </div>
        </Section>
        
    )
}

export default Events