import { useFetch } from "../../utils/hooks/useFetch"
import { useState } from "react"

import Section from "../../comp/Templates/Section"
import SearchBar from "../../comp/Mollecules/SearchBar"
import LinksList from "../../comp/Organisms/LinksList"
import CardTransmission from "../../comp/Organisms/CardTransmission"
import TagSelector from "../../comp/Mollecules/TagSelector"
import H1 from "../../comp/Atoms/H1"
import BtnCTA from "../../comp/Atoms/BtnCTA"

// TODO replace local asset with dynamic ones
import defaultImage from '../../assets/images/transmissions/simple80s.jpg'

const Transmissions = () => {

    const { data: transmissionsData, isLoading: isTransLoading } = useFetch(`https://localhost:8000/api/transmissions/`)

    const [activeTags, setActiveTags] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [visibleTransmissions, setVisibleTransmissions] = useState(6)
    const baseUrl = "https://127.0.0.1:8000/api/files/images?file_name="

    if (isTransLoading) {
        return <div>Loading...</div>; // Add a loading indicator
    }

    // Filter transmissions by search term
    const filterBySearch = (data, searchTerm) => {
        if (!searchTerm) return data
        return data.filter(item =>
            item.transmission_title.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }

    // Filter transmissions by active tags
    const filterByTags = (data, tags) => {
        if (tags.length === 0) return data
        return data.filter(item => tags.includes(item.transmission_label))
    }

    const loadMore = () => {
        setVisibleTransmissions(prev => prev + 3)
    }

    // Sort data alphabetically
    const sortedData = [...transmissionsData].sort((a, b) => a.transmission_title.localeCompare(b.transmission_title))

    // Apply search and tag filters **before** slicing
    const filteredBySearch = filterBySearch(sortedData, searchTerm)
    const filteredByTags = filterByTags(filteredBySearch, activeTags)
    const visibleData = filteredByTags.slice(0, visibleTransmissions) // Slice only the filtered ones

    return (
        <div>
            <Section className="background-white">
                <H1 content='Transmissioni' />
                <div className='line'></div>

                <TagSelector 
                    activeTags={activeTags} 
                    setActiveTags={setActiveTags}
                />

                <div className='flex-grid'>
                    {visibleData.map(transmission => {
                        const imageUrl = transmission.transmission_img 
                            ? `${baseUrl}${transmission.transmission_img}`
                            : defaultImage

                        return (
                            <CardTransmission 
                                key={transmission.id_old}
                                title={transmission.transmission_title}
                                url={`/transmission/${transmission.id_old}`} 
                                isActive={activeTags.length === 0 || activeTags.includes(transmission.transmission_label)}
                                image={imageUrl}
                                label= {transmission.transmission_label}
                            />
                        )
                    })}

                    {visibleTransmissions < filteredByTags.length && (
                        <div className="flex-horiz-center">
                            <BtnCTA btnContent="Carica di più" onClick={loadMore} />
                        </div>
                    )}
                </div>
            </Section>

            <Section className='background-black text-white'>
                <div className='flex-horiz links-list-search-bar'>
                    <SearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                </div>

                <LinksList 
                    data={filteredByTags}
                    text={filteredByTags.map(item => item.transmission_title)}
                    url={filteredByTags.map(item => `/transmission/${item.id_old}`)}
                />
            </Section>
        </div>
    )
}

export default Transmissions
