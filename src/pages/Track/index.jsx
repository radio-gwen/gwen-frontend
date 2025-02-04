import { useParams } from "react-router-dom"
import { useFetch } from "../../utils/hooks/useFetch"

import Section from "../../comp/Templates/Section"
import Carousel from "../../comp/Mollecules/Carousel"
import Card from "../../comp/Organisms/Card"

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
        <Section>
            <Carousel />
            <Card
            title = {track.name}
            desc = {track.desc}
            btnContent = 'Back'
            url = '/'
            />

        </Section>
    )
}

export default Track