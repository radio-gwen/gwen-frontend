import { useState } from "react"
import { useFetch } from "../../utils/hooks/useFetch"

import Section from "../../comp/Templates/Section"
import CardTransmission from "../../comp/Organisms/CardTransmission"
import TagSelector from "../../comp/Mollecules/TagSelector"
import H1 from "../../comp/Atoms/H1"

//TODO Replace local asset with dynamics ones
import defaultImage from '../../assets/images/transmissions/simple80s.jpg'

const Events = () => {

    const {data: eventsData, isLoading: isEventLoading} = useFetch(`http://localhost:8000/events`)
    const eventsList = eventsData?.eventsList || [];

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
                    {eventsList.map( event => {
                        const isActive = !(activeTags.length > 0 && !activeTags.includes(event.label))
                        return(
                        <CardTransmission 
                        title={event.title}
                        url={`/transmission/${event.id}`} 
                        isActive={isActive}
                        image = {defaultImage}
                        />)}
                    )}
                </div>
        </Section>
        
    )
}

export default Events