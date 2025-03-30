import { Link } from "react-router-dom"
import Badge from "../../Atoms/Badge"

import ImageCardBox from "../../Atoms/ImageCardBox"

const CardTransmission = ({id, title, desc, label, image, url, isActive}) => {
    return(
        
            <div className={`card-transmission ${!isActive ? 'invisible' : ''}`}>
            <Link to={url}>
                <ImageCardBox src={image} alt='nome' />
                <h3 className='background-white'>{title}</h3>
                <Badge content={label}/>
            </Link>
            </div>
        
    )
}

export default CardTransmission