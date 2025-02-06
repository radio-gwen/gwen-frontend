import { useParams } from "react-router-dom"
import { useFetch } from "../../utils/hooks/useFetch"

import Section from "../../comp/Templates/Section"
import BlockCenter from "../../comp/Organisms/BlockCenter"
import Carousel from "../../comp/Mollecules/Carousel"
import Card from "../../comp/Organisms/Card"
import Player from "../../comp/Mollecules/Player"

//TODO replace local asset with dynamic one
import jingle from '../../assets/audio/jingle.mp3'
import defaultImage from '../../assets/images/transmissions/simple80s.jpg'

const Track = () => {

    const {trackId} = useParams()

    const {data: tracksData, isLoading: isTracksLoading} = useFetch(`http://localhost:8000/tracks`)
    const tracksList = tracksData?.tracksList || []

    if (isTracksLoading) {
        return <div>Loading...</div>; //TODO Add a loading indicator
    }

    const track = tracksList.find(t => String(t.id) === trackId);

    if (!track) {
        return <div>Track not found!</div>;
    }


    return(
        <Section className='background-white'>
            <Carousel image={defaultImage}/>
            <Card
            title = {track.name}
            desc = {track.desc}
            btnContent = 'Back'
            label = {track.label}
            url = '/'
            />
            <BlockCenter>
                <Player
                track = {jingle}
                id ={track.id}/>
            </BlockCenter>

        </Section>
    )
}

export default Track