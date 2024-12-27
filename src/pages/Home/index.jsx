import Section from "../../comp/Templates/Section";
import H1 from "../../comp/Atoms/H1";
import BlockCenter from "../../comp/Organisms/BlockCenter";
import CardContent from "../../comp/Mollecules/CardContent";
import CardImage from "../../comp/Organisms/CardImage";
import CardToogle from "../../comp/Organisms/CardToogle";
import Newsletter from "../../comp/Organisms/Newsletter";
import Contacts from "../../comp/Templates/Contats";
import transmissionsList from "../../data/transmissionsList";
import eventsList from "../../data/eventsList";

function Home() {
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
              imgSrc={transmission.image}
              imgDesc={transmission.imgDesc}
              url = {`/transmission/${transmission.id}`}
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
