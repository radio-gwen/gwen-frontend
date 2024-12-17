import { Link } from "react-router-dom"

const PartnersLogo = ({src, imgDesc, url}) => {
    return(
        <Link to={url}>
            <img src={src} alt={imgDesc} 
            style={{maxWidth: 120, maxHeight: 100}}
            />
        </Link>
    )
}

export default PartnersLogo