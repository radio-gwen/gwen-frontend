import PartnersLogo from "../../Atoms/PartnersLogo"
import partners from "../../../data/partnersList"

const Partnerslist = () => {
    return(
        <div className="prtners-list" >

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