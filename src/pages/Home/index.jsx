import { useFetch } from "../../utils/hooks/useFetch";
import { useState } from "react";

import Section from "../../comp/Templates/Section";
import H1 from "../../comp/Atoms/H1";
import BlockCenter from "../../comp/Organisms/BlockCenter";
import CardContent from "../../comp/Mollecules/CardContent";
import CardImage from "../../comp/Organisms/CardImage";
import CardToogle from "../../comp/Organisms/CardToogle";
import Newsletter from "../../comp/Organisms/Newsletter";
import Contacts from "../../comp/Templates/Contats";
import BtnCTA from "../../comp/Atoms/BtnCTA";
/*TODO Cancel the local import to fetch transmission.image*/
import defaultImage from "../../assets/images/transmissions/simple80s.jpg";


function Home() {

  const [visibleTransmissions, setVisibleTransmissions] = useState(3)
  const [visibleEvents, setVisibleEvents] = useState(3)

  const {data: transmissionsData, isLoading: isTransLoading} = useFetch(`https://localhost:8000/api/transmissions/`,{redirect: 'follow'})

  const {data: eventsData, isLoading: isEventsLoading} = useFetch(`https://localhost:8000/api/events/`)

  if (isTransLoading || isEventsLoading) {
    return <div>Loading...</div>; // Add a loading indicator
}  

  const loadMore = (type) => {
    type === 'transmissions' ? setVisibleTransmissions( prev => prev + 3 ) : setVisibleEvents( prev => prev + 3 )
  }


  return (
    <div>
      <Section>
        <H1 content='Trasmissioni'/>
        <div className='line'></div>

         {transmissionsData.slice(0, visibleTransmissions).map( transmission => 
          <div key = {`div-${transmission.transmission_id_old}`}>
          <CardImage 
            key = {transmission.id_old}
            title = {transmission.transmission_title}
            desc = {transmission.transmission_desc}
            btnContent = 'Vai!'
            /*TODO Fetch transmission.image*/
            imgSrc={defaultImage}
            imgDesc={transmission.transmission_imgDesc}
            url = {`/transmission/${String(transmission.id_old)}`}
            label = {transmission.transmission_label}
          />
          <div key = {`line-${transmission.id_old}`} className='line'></div>
        </div>
        )} 
        <div className="flex-horiz-center background-black"> <BtnCTA btnContent='...più trasmissioni' onClick={() => loadMore('transmissions')} /> </div>
      </Section>        

      <Section>
        <H1 content='Eventi' />
        
        <div className='line'></div>
        {eventsData.slice(0, visibleEvents).map( event =>
          <div key = {`div-${event.id_old}`}>
            <CardToogle
            key ={event.id_old}
            title={event.event_title} 
            >
              <CardContent 
              desc={event.event_desc}
              btnContent={'Vai'}
              url={`/event/${event.id_old}`}
              label={event.event_label}
              />
            </CardToogle>
            <div className='line'></div>
          </div>
        )}
        <div className="flex-horiz-center background-black"> <BtnCTA btnContent='...più eventi' onClick={() => loadMore('events')}/> </div>
      </Section>

      <Section className='background-cta'>
        <BlockCenter>
          <Newsletter />
        </BlockCenter>
        <div className='line'></div>
      </Section>

      <Contacts />

    </div>
  );
}

export default Home;
