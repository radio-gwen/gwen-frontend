import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useFetch } from "../../utils/hooks/useFetch"

import Section from '../../comp/Templates/Section'
import SectionContent from '../../comp/Organisms/SectionContent'
import H1 from '../../comp/Atoms/H1'

const Search = () => {

    //const { dataTrans: transmissionsData, isLoading: isTransLoading } = useFetch(`https://localhost:8000/api/transmissions/`)
    //const { dataEvents: eventsData, isLoading: isEventsLoading } = useFetch(`https://localhost:8000/api/events/`)
    const { dataTrans: transmissionsData, isLoading: isTransLoading } = useFetch(`/api/transmissions/`)
    const { dataEvents: eventsData, isLoading: isEventsLoading } = useFetch(`/api/events/`)
    /*TODO Add a Track search system*/
    const [activeTags, setActiveTags] = useState([])
    //const baseUrl = "https://127.0.0.1:8000/api/files/images?file_name="
    const baseUrl = "/api/files/images?file_name="
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');

    if (isTransLoading || isEventsLoading) {
        return <div>Loading...</div>; // TODO Add a loading indicator
    }

    /*TODO extend the search not only to the title but as well for any kind of content*/
    const filterTransBySearch = (dataTrans, query) => {
        dataTrans.filter(item =>
        item.transmission_title.toLowerCase().includes(query.toLowerCase())
        )
    }

    /*TODO extend the search not only to the title but as well for any kind of content*/
    const filterEventsBySearch = (dataEvents, query) => {
        dataEvents.filter(item =>
        item.event_title.toLowerCase().includes(query.toLowerCase())
        )
    }

    // Filter transmissions & events by active tags
    const filterTransByTags = (dataTrans, tags) => {
        if (tags.length === 0) return dataTrans
        return dataTrans.filter(item => tags.includes(item.transmission_label))
    }
    const filterEventsByTags = (dataEvents, tags) => {
        if (tags.length === 0) return dataEvents
        return dataEvents.filter(item => tags.includes(item.event_label))
    }

    /*
    const sortedTransData = [...transmissionsData].sort((a, b) => a.transmission_title.localeCompare(b.transmission_title))
    const sortedEventsData = [...eventsData].sort((a, b) => a.event_title.localeCompare(b.event_title))
   */

    

    return(
        <Section>
          <H1 content='cosa stai cercando?'/>
            <div className='line'></div>
        <SectionContent>
            {query ? <p>Searching for: {query}</p> : 'cosa stai cercando?'}
        </SectionContent>
        </Section>
    )
}

export default Search