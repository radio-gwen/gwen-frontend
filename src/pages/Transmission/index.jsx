import { useParams } from "react-router-dom"
import { useFetch } from "../../utils/hooks/useFetch"
import { useNavigate } from "react-router-dom"

import Section from "../../comp/Templates/Section"
import Carousel from "../../comp/Mollecules/Carousel"
import Card from "../../comp/Organisms/Card"
import Toogle from "../../comp/Organisms/Toogle"
import ImageBox from '../../comp/Atoms/ImageBox'
import BtnCTA from "../../comp/Atoms/BtnCTA"

// TODO We could diplay this jingle in case no tracks file is found
import jingle from '../../assets/audio/jingle.mp3';
import defaultImage from '../../assets/images/transmissions/simple80s.jpg'


const Transmission = ({setAudioSrc, setTrackPlaying, setIsTrackSet}) => {

    const navigate = useNavigate()

    const {transId} = useParams()

    const {data: transmissionsData, isLoading: isTransLoading} = useFetch(`https://localhost:8000/api/transmissions/`)

    const {data: tracksData, isLoading: isTracksLoading} = useFetch(`https://localhost:8000/api/tracks/`)
  
    if (isTransLoading) {
        return <div>Loading...</div>; // Add a loading indicator
    }

    if (isTracksLoading) {
        return <div>Loading...</div>; // Add a loading indicator
    }

    const transmission = transmissionsData.find((t) => t.id_old === Number(transId))

    if (!transmission) {
        console.log('transmission not found!')
    }

    // We look for the refTransmission id
    const refTransId = transmission.id_old

    const tracks = tracksData.filter(track => 
        track.transmission_id?.toString().startsWith(refTransId.toString()) &&
        track.tracks_publication === "trans"
    )

    if (!tracks) {
        console.log('tracks not found!')
    }

    const imageUrl = transmission?.transmission_img 
  ? `https://localhost:8000/api/files/images?file_name=${transmission.transmission_img}` 
  : defaultImage;


    return(
       <Section>

            <Carousel image = {imageUrl} width= '300px'/>

            <Card
            title = {transmission.transmission_title}
            desc = {transmission.transmission_desc}
            text = {transmission.transmission_text}
            btnContent = 'Back'
            onClick = {() => navigate(-1)}
            label = {transmission.transmission_label}
            />

            {tracks
            .filter(track => track.deleted === false && 
                (!track.to_be_published_at || new Date(track.to_be_published_at) <= new Date()))
            .map( (track) =>  
            
                <div>
                    <div className='line'></div>
                    <Toogle title={track.tracks_title} id={`track-${track.track_id}`}>
                        <div className="flex-horiz" style={{alignItems: 'flex-start', padding: '0px'}}>
                            {track.tracks_img && <ImageBox src={`https://127.0.0.1:8000/api/files/images?file_name=${track.tracks_img}`} />}
                            
                            <div className='flex-vert' style={{padding: '0px'}}>
                                <p style={{marginTop: 'var(--spacing-small)'}}>{track.tracks_desc}</p>
                                <div style={{marginTop: 'var(--spacing-large)'}}>
                                    <BtnCTA
                                        btnContent='Ascolta!'
                                        onClick={() => {
                                            setAudioSrc(`https://127.0.0.1:8000/api/files/tracks?file_name=${track.tracks_track}`)
                                            setTrackPlaying(track.tracks_title)
                                            setIsTrackSet(true)
                                    }}/>
                                </div>
                            </div>
                        </div>

                        

                    </Toogle>
                </div>

            )}

            <div className="line"></div>



        </Section>
    )
}

export default Transmission