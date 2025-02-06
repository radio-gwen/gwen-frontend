import { useFetch } from "../../utils/hooks/useFetch";

import Section from "../../comp/Templates/Section";
import H1 from "../../comp/Atoms/H1";
import BlockCenter from "../../comp/Organisms/BlockCenter";
import CardContent from "../../comp/Mollecules/CardContent";
import CardImage from "../../comp/Organisms/CardImage";
import CardToogle from "../../comp/Organisms/CardToogle";
import Newsletter from "../../comp/Organisms/Newsletter";
import Contacts from "../../comp/Templates/Contats";
/*TODO Cancel the local import to fetch transmission.image*/
import defaultImage from "../../assets/images/transmissions/simple80s.jpg"

function Home() {

  const {data: transmissionsData, isLoading: isTransLoading} = useFetch(`http://localhost:8000/transmissions`)
  const transmissionsList = transmissionsData?.transmissionsList || [];

  const {data: eventsData, isLoading: isEventsLoading} = useFetch(`http://localhost:8000/events`)
  const eventsList = eventsData?.eventsList || [];

  if (isTransLoading || isEventsLoading) {
    return <div>Loading...</div>; // Add a loading indicator
}

  return (
    <div>
      <Section>
        <H1 content='Trasmissioni'/>
        <div className='line'></div>

         {transmissionsList.map( transmission => 
          <div key = {`div-${transmission.id}`}>
            <CardImage 
              key = {transmission.id}
              title = {transmission.title}
              desc = {transmission.desc}
              btnContent = 'Vai!'
              /*TODO Fetch transmission.image*/
              imgSrc={defaultImage}
              imgDesc={transmission.imgDesc}
              url = {`/transmission/${transmission.id}`}
              label = {transmission.label}
            />
            <div key = {`line-${transmission.id}`} className='line'></div>
          </div>
        )} 

      </Section>        

      <Section>
        <H1 content='Eventi' />
        
        <div className='line'></div>
        {eventsList.map( event =>
          <div key = {`div-${event.id}`}>
            <CardToogle
            key ={event.id}
            title={event.title} 
            >
              <CardContent 
              desc={event.desc}
              btnContent={'Vai'}
              url={`/event/${event.id}`}
              label={event.label}
              />
            </CardToogle>
            <div className='line'></div>
          </div>
        )}
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
