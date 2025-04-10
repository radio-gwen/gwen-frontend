import { useState } from "react"
import { useFetch } from "../../utils/hooks/useFetch"

import Section from "../../comp/Templates/Section"
import SearchBar from "../../comp/Mollecules/SearchBar"
import LinksList from "../../comp/Organisms/LinksList"
import CardTransmission from "../../comp/Organisms/CardTransmission"
import TagSelector from "../../comp/Mollecules/TagSelector"
import H1 from "../../comp/Atoms/H1"
import BtnCTA from "../../comp/Atoms/BtnCTA"

//TODO Replace local asset with dynamics ones
import defaultImage from '../../assets/images/transmissions/simple80s.jpg'

const Events = () => {

    /*const {data: eventsData, isLoading: isEventLoading} = useFetch(`https://localhost:8000/api/events/`)*/
    const {data: eventsData, isLoading: isEventLoading} = useFetch(`/api/events/`)

    const [activeTags, setActiveTags] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [visibleEvents, setVisibleEvents] = useState(6)
    //const baseUrl = "https://127.0.0.1:8000/api/files/images?file_name="
    const baseUrl = "/api/files/images?file_name="

    if (isEventLoading) {
        return <div>Loading...</div>; // Add a loading indicator
    }

    // Filter transmissions by search term
    const filterBySearch = (data, searchTerm) => {
        if (!searchTerm) return data
        return data.filter(item =>
            item.event_title.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }

    // Filter transmissions by active tags
    const filterByTags = (data, tags) => {
        if (tags.length === 0) return data
        return data.filter(item => tags.includes(item.event_label))
    }

    const loadMore = () => {
        setVisibleEvents(prev => prev + 3)
    }

    // Sort data alphabetically
    const sortedData = [...eventsData].sort((a, b) => a.event_title.localeCompare(b.event_title))

    // Apply search and tag filters **before** slicing
    const filteredBySearch = filterBySearch(sortedData, searchTerm)
    const filteredByTags = filterByTags(filteredBySearch, activeTags)
    const visibleData = filteredByTags.slice(0, visibleEvents) // Slice only the filtered ones

    return(

        <div>

            <Section className='background-black text-white'>
                <H1 content='Eventi' />
                <div className='flex-horiz links-list-search-bar'>
                    <SearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                </div>

                <LinksList 
                    data={filteredBySearch}
                    text={filteredBySearch.map(item => item.event_title)}
                    url={filteredBySearch.map(item => `/event/${item.id_old}`)}
                />
            </Section>   

            <Section className="background-white">
                
                <div className='line'></div>

                <TagSelector 
                    activeTags={activeTags} 
                    setActiveTags={setActiveTags}
                />

                <div className='flex-grid'>
                        {visibleData.map( event => {
                            const imageUrl = event.event_img 
                            ? `${baseUrl}${event.event_img}`
                            : defaultImage

                            return(
                                <CardTransmission 
                                    title={event.event_title}
                                    url={`/event/${event.id_old}`} 
                                    isActive={activeTags.length === 0 || activeTags.includes(event.event_label)}
                                    image = {imageUrl}
                                    label= {event.event_label}
                            />
                        )
                    })}

                    {visibleEvents < filteredByTags.length && (
                        <div className="flex-horiz-center">
                            <BtnCTA btnContent="Carica di più" onClick={loadMore} />
                        </div>
                    )}
                    </div>
            </Section>
 
        </div>
    )
}

export default Events