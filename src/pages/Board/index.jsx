import { useFetch } from "../../utils/hooks/useFetch"
import { useState } from "react"
import { Outlet } from "react-router-dom"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

import Section from "../../comp/Templates/Section"
import BlockCenter from "../../comp/Organisms/BlockCenter"
import LinksList from "../../comp/Organisms/LinksList"
import SearchBar from "../../comp/Mollecules/SearchBar"
import H1 from "../../comp/Atoms/H1"
import BtnCTA from "../../comp/Atoms/BtnCTA"


const Board = () =>{

    const [isTransOpen, setIsTransOpen] = useState(false)
    const [isEventsOpen, setIsEventsOpen] = useState(false)

    const toogle = (type) => {
        if (type === 'trans'){
        setIsTransOpen(!isTransOpen)
        }
        if (type === 'event'){
            setIsEventsOpen(!isEventsOpen)
        }
    }

    //We fetch the transmissions data
    const { data: transmissionsData, isLoading: isTransLoading } = useFetch(`https://localhost:8000/api/transmissions/`)
    // TODO We get the url data

    // We get the id from the URL dynamically (TODO)
    const {type, id} = useParams()

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

            <H1 content='Board'/>

            <div className='line'></div>

            <div className='flex-horiz background-black text-white'>

                <span className='hover-underline' onClick={ () => toogle('trans')}>Trasmissioni</span>
                <span> | </span>
                <Link to='/board/trans/0'><span className='hover-underline'>Nuova Trasmissione</span></Link>
                <span> | </span>
                <span className='hover-underline' onClick={ () => toogle('event')}>Eventi</span>
                <span> | </span>
                <Link to='/board/event/0'><span className='hover-underline'>Nuovo Evento</span></Link>
                <span> | </span>
                <span className='hover-underline'>Chi Siamo</span>
                <span> | </span>
                <span className='hover-underline'>Partners</span>
                <span> | </span>
                <span className='hover-underline'>Tags</span>

            </div>

            <BlockCenter background='background-white'>
                Benvenuti a bordo del Board. Il panello di controllo per la publicazione di contenuti sul sito di radio Gwendalyn.
            </BlockCenter>

            <div className={isTransOpen ? 'open' : 'closed'}>
                <div className='flex-horiz links-list-search-bar'>
                    <SearchBar  searchTerm = {searchTerm} setSearchTerm= {setSearchTerm}/>
                </div>
                <LinksList
                    onClick = {() => toogle('trans')}
                    data = {filteredData}
                    text= {filteredData.map(item => item.transmission_title)}
                    url= {filteredData.map(item => `trans/${item.id_old}`)}
                />
            </div>

            <div className={isEventsOpen ? 'open' : 'closed'}>
                <div className='flex-horiz links-list-search-bar'>
                    <SearchBar  searchTerm = {searchTerm} setSearchTerm= {setSearchTerm}/>
                </div>
                <LinksList
                    onClick = {() => toogle('event')}
                    data = {filteredData}
                    text= {filteredData.map(item => item.transmission_title)}
                    url= {filteredData.map(item => `trans/${item.id_old}`)}
                />
            </div>

            < Outlet context={{type, id, transmissionsData}}/>
            
        </Section>
    )
}

export default Board