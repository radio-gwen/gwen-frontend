import { useFetch } from "../../utils/hooks/useFetch"
import { useState } from "react"

import { useParams } from "react-router-dom"

import Section from "../../comp/Templates/Section"
import Toogle from "../../comp/Organisms/Toogle"
import LinksList from "../../comp/Organisms/LinksList"
import SearchBar from "../../comp/Mollecules/SearchBar"
import H1 from "../../comp/Atoms/H1"
import TestForm2 from "../../comp/Atoms/TestForm2"


const Board = () =>{

    //We fetch the transmissions data
    const { data: transmissionsData, isLoading: isTransLoading } = useFetch(`https://localhost:8000/api/transmissions/`)
    // TODO We get the url data
    
    //We create a state for the tranmissions search field input
    const [searchTerm, setSearchTerm] = useState('')

    if (isTransLoading) {
        return <div>Loading...</div>; // TODO Add a loading indicator
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
        <Section className='background-primary'>

            <H1 content='Transmissions'/>
            <div className='line'></div>

                <Toogle title='all transmissions'>
                
                    <div className='flex-horiz links-list-search-bar'>
                    <SearchBar
                        searchTerm = {searchTerm}
                        setSearchTerm= {setSearchTerm}
                    />
                    </div>

                    <LinksList 
                    data = {filteredData}
                    text= {filteredData.map(item => item.transmission_title)}
                    url= {filteredData.map(item => `trans${item.id_old}`)}
                    />

                    
                                        
                </Toogle>
                <div className='line'></div>
                <Toogle title='new transmission'>
                    <TestForm2 />
                </Toogle>
            
            <div className='line'></div>
            <H1 content='Events'/>
            <div className='line'></div>

                <Toogle title='all events'>
                </Toogle>
                <div className='line'></div>
                <Toogle title='new event'>
                </Toogle>

            <div className='line'></div>
            <H1 content='Contents'/>
            <div className='line'></div>

                <Toogle title='about'>
                </Toogle>
                <div className='line'></div>
                <Toogle title='partners'>
                </Toogle>
                <div className='line'></div>
                <Toogle title='tags'>
                </Toogle>
            
        </Section>
    )
}

export default Board