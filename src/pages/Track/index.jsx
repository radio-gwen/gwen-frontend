import { useParams } from "react-router-dom"
import { useFetch } from "../../utils/hooks/useFetch"

import Section from "../../comp/Templates/Section"
import BlockCenter from "../../comp/Organisms/BlockCenter"
import Carousel from "../../comp/Mollecules/Carousel"
import Card from "../../comp/Organisms/Card"
import Player from "../../comp/Mollecules/PlayerLine"

//TODO replace local asset with dynamic one
import jingle from '../../assets/audio/jingle.mp3'
import defaultImage from '../../assets/images/transmissions/simple80s.jpg'

const Track = () => {

    const {trackId} = useParams()

    const {data: tracksData, isLoading: isTracksLoading} = useFetch(`https://localhost:8000/api/tracks/`)

    if (isTracksLoading) {
        return <div>Loading...</div>; //TODO Add a loading indicator
    }

    const track = tracksData.find(track => String(track.id) === trackId);

    if (!track) {
        return <div>Track not found!</div>;
    }


    return(
        <Section className='background-white'>
            <Carousel image={defaultImage}/>
            <Card
            title = {track.tracks_title}
            desc = {track.desc}
            btnContent = 'Back'
            label = {track.tracks_label}
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