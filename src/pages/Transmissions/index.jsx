import { useFetch } from "../../utils/hooks/useFetch"
import { useState } from "react"

import Section from "../../comp/Templates/Section"
import CardTransmission from "../../comp/Organisms/CardTransmission"
import TagSelector from "../../comp/Mollecules/TagSelector"
import H1 from "../../comp/Atoms/H1"

// TODO replace local asset with dynamic ones
import defaultImage from '../../assets/images/transmissions/simple80s.jpg'

const Transmissions = () => {

    const {data: transmissionsData, isLoading: isTransLoading} = useFetch(`http://localhost:8000/transmissions`)
    const transmissionsList = transmissionsData?.transmissionsList || [];

    const [activeTags, setActiveTags] = useState([])

    if (isTransLoading) {
        return <div>Loading...</div>; // Add a loading indicator
    }

    return(
            
            <Section className="background-white">
                <H1 content='Transmissioni' />
                <div className='line'></div>
                <TagSelector 
                activeTags={activeTags} 
                setActiveTags={setActiveTags}
                />
                <div className='flex-grid'>
                    {transmissionsList.map( transmission => {
                        const isActive = !(activeTags.length > 0 && !activeTags.includes(transmission.label))
                        return(
                        <CardTransmission 
                        title={transmission.title}
                        url={`/transmission/${transmission.id}`} 
                        isActive={isActive}
                        image = {defaultImage}
                        />)}
                    )}
                </div>

            </Section>
            

        
    )
}

export default Transmissions