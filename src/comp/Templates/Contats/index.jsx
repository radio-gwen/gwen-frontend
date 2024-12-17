import Section from "../Section"
import SectionContent from "../../Organisms/SectionContent"
import ParagraphCenter from "../../Mollecules/Paragraph"
import IconsSocials from "../../Mollecules/IconsSocials"

const Contacts = () => {
    return(
        <Section>
            <SectionContent backgroundColor='var(--primary-color)'>
                <ParagraphCenter 
                title = 'Contatti'
                text= 'testo contatti da complettare...'
                />
                <IconsSocials />
            </SectionContent>
            <div className="line"></div>
        </Section>
        
    )
}

export default Contacts