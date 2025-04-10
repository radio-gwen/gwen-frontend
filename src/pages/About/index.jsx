import { useNavigate } from 'react-router-dom'

import Section from '../../comp/Templates/Section'
import SectionContent from '../../comp/Organisms/SectionContent'
import H1 from '../../comp/Atoms/H1'
import Carousel from '../../comp/Mollecules/Carousel'
import BtnCTA from '../../comp/Atoms/BtnCTA'

function About (){

    const navigate = useNavigate()

    return(
        <Section className='background-tertiary'>

            <H1 content='Chi siamo'/>

            <div className='line'></div>
            
            <Carousel 
            //image='https://127.0.0.1:8000/api/files/images?file_name=radio_gwen_test_06.jpg'
            image='/images?file_name=radio_gwen_test_06.jpg'
            />

            <div className='line'></div>

            <SectionContent>
                <h3>Hello!</h3>
                <p>Nel 2005 Alan Alpenfelt, Chiasso, e Stefano Palermo, Milano, decidono di realizzare un sogno nel cassetto: sentire in radio quel tipo di musica che le emittenti statali e private non passavano – e tuttora non passano. Inizia come esperimento lo-fi con umili pretese e l’idea di dare vita a una internet radio indipendente, Radio Gwendalyn, per gli amici e le amiche Radio Gwen. Durante strani sogni rivelatori Gwen riceve la sacra missione di continuare il suo nobile lavoro e nel 2008 si trasferisce in un garage a Chiasso, ripitturato e diventato ben presto luogo di incontro e di sperimentazione. Radio Gwen inizia a partecipare a vari eventi locali ed entra a far parte della ASROC – Associazione svizzera delle radio online e via cavo. Nel 2010 su invito del Comune di Chiasso segue un progetto fotografico durante la IX Biennale dell’Immagine per cui produce un racconto audio intitolato Le avventure del Geco in collaborazione con Chiasso, Culture in movimento.</p>
                <BtnCTA 
                    btnContent='back'
                    onClick={() => navigate(-1)}
                />
            </SectionContent>

        </Section>
    )
}

export default About