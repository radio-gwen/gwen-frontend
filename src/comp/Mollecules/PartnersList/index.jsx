import PartnersLogo from "../../Atoms/PartnersLogo"
import partners from "../../../data/partnersList"

const Partnerslist = () => {
    return(
        <div className="flex-horiz" style={{gap: 'var(--spacing-very-large)', marginTop: 'var(--spacing-very-large)', marginBottom: 'var(--spacing-very-large)'}}>

            {partners.map( partner =>
                <PartnersLogo 
                key = {`partners-${partner.id}`}
                src={partner.src}
                imgDesc={partner.imgDesc}
                url={partner.url}
                />
            )}

        </div>
    )
}

export default Partnerslist