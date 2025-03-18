import { useFetch } from "../../utils/hooks/useFetch"
import { useState } from "react"
import { Outlet } from "react-router-dom"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"


import Section from "../../comp/Templates/Section"
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
    //We fetch the events data
    const { data: eventsData, isLoading: isEventsLoading } = useFetch(`https://localhost:8000/api/events/`)
    // TODO We get the url data

    // We get the id from the URL dynamically (TODO)
    const {type, id} = useParams()

    //We create a state for the search field input
    const [searchTerm, setSearchTerm] = useState('')

    if (isTransLoading) {
        return <div>Loading...</div>; // TODO Add a loading indicator
    }
    if (isEventsLoading) {
        return <div>Loading...</div>; // TODO Add a loading indicator
    }

    // We filter the data in funtion of the search input
    const filterData = (data, searchTerm) => {
        if (!searchTerm) return data
        return data.filter( item=>
            item.transmission_title.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }

    const filterEventsData = (eventsData, searchTerm) => {
        if (!searchTerm) return eventsData
        return eventsData.filter( item=>
            item.event_title.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }

    // We sort transmissions data in alphabetical order
    const sortedData = [...transmissionsData].sort((a, b) => a.transmission_title.localeCompare(b.transmission_title))

    const filteredData = filterData(sortedData, searchTerm)

        // We sort events data in alphabetical order
        const sortedEventsData = [...eventsData].sort((a, b) => a.event_title.localeCompare(b.event_title))

        const filteredEventsData = filterEventsData(sortedEventsData, searchTerm)


        console.log("Ma Transmissions Data:", transmissionsData);
        console.log("Mon Events Data:", eventsData);
    
   

    return(
        <Section className='background-primary'>

            <H1 content='Board'/>

            <div className='line'></div>

            <div className='flex-horiz background-black text-white'>

                <span className='hover-underline' onClick={ () => toogle('trans')}>Trasmissioni</span>
                <span> | </span>
                <span className='hover-underline' onClick={ () => toogle('event')}>Eventi</span>
                <span> | </span>
                <span className='hover-underline'>Chi Siamo</span>
                <span> | </span>
                <span className='hover-underline'>Partners</span>
                <span> | </span>
                <span className='hover-underline'>Tags</span>

            </div>

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

                <div className='flex-horiz-center'>
                    <Link to='/board/trans/0'>
                        <BtnCTA btnContent='nuova trasmissione' onClick={() => toogle('trans')}/>
                    </Link>
                </div>

            </div>

            <div className={isEventsOpen ? 'open' : 'closed'}>
                <div className='flex-horiz links-list-search-bar'>
                    <SearchBar  searchTerm = {searchTerm} setSearchTerm= {setSearchTerm}/>
                </div>
                <LinksList
                    onClick = {() => toogle('event')}
                    data = {filteredEventsData}
                    text= {filteredEventsData.map(item => item.event_title)}
                    url= {filteredEventsData.map(item => `event/${item.id_old}`)}
                />

                <div className='flex-horiz-center'>
                    <Link to='/board/event/0'>
                        <BtnCTA btnContent='nuovo evento'/>
                    </Link>
                </div>
            </div>

            < Outlet context={{type, id, transmissionsData, eventsData}}/>

            
        </Section>
    )
}

export default Board