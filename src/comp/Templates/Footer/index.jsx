import Section from "../Section"
import SectionContent from "../../Organisms/SectionContent"
import Partnerslist from "../../Mollecules/PartnersList"

const Footer = () => {
    return(
        <Section>
            <SectionContent backgroundColor='var(--black)' color='var(--white)'>
            con il gentile sostegno di:
            <Partnerslist />
            </SectionContent>
        </Section>
    )
}

export default Footer