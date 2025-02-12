import { useFetch } from "../../utils/hooks/useFetch"
import { useState } from "react"

import Section from "../../comp/Templates/Section"
import SearchBar from "../../comp/Mollecules/SearchBar"
import LinksList from "../../comp/Organisms/LinksList"
import CardTransmission from "../../comp/Organisms/CardTransmission"
import TagSelector from "../../comp/Mollecules/TagSelector"
import H1 from "../../comp/Atoms/H1"

// TODO replace local asset with dynamic ones
import defaultImage from '../../assets/images/transmissions/simple80s.jpg'

const Transmissions = () => {

    const {data: transmissionsData, isLoading: isTransLoading} = useFetch(`https://localhost:8000/api/transmissions/`)

    const [activeTags, setActiveTags] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    if (isTransLoading) {
        return <div>Loading...</div>; // Add a loading indicator
    }

    // We filter the data in funtion of the search input
    const filterData = (data, searchTerm) => {
        if (!searchTerm) return data
        return data.filter( item=>
            item.transmission_title.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }

    // We sort data in alphabetical order
    const sortedData = [...transmissionsData].sort((a, b) => a.transmission_title.localeCompare(b.transmission_title));

    const filteredData = filterData(sortedData, searchTerm);

    return(
            
        <div>
            <Section className="background-white">
                <H1 content='Transmissioni' />
                <div className='line'></div>

                <TagSelector 
                activeTags={activeTags} 
                setActiveTags={setActiveTags}
                />
                <div className='flex-grid'>
                    {transmissionsData.map( transmission => {
                        const isActive = !(activeTags.length > 0 && !activeTags.includes(transmission.transmission_label))
                        return(
                        <CardTransmission 
                        title={transmission.transmission_title}
                        url={`/transmission/${transmission.id_old}`} 
                        isActive={isActive}
                        image = {defaultImage}
                        />)}
                    )}
                </div>
            </Section>

            <Section className='background-black text-white'>
                
                <div className='flex-horiz links-list-search-bar'>
                <SearchBar
                searchTerm = {searchTerm}
                setSearchTerm = {setSearchTerm}
                />
                </div>

                <LinksList 
                data={filteredData}
                text={filteredData.map(item => item.transmission_title)}
                url={filteredData.map(item => `/transmission/${item.id_old}`)}
                />
                

            </Section>
        </div>
            

        
    )
}

export default Transmissions