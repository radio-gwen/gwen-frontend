import { Link } from "react-router-dom"
import Badge from "../../Atoms/Badge"

import ImageCardBox from "../../Atoms/ImageCardBox"

const CardTransmission = ({id, title, desc, label, image, url, isActive}) => {
    return(
        
            <div className={`card-transmission ${!isActive ? 'invisible' : ''}`}>
            <Link to={url}>
                <ImageCardBox src={image} alt='nome' />
                <div className='flex-vert margin-small'>
                <Badge content={label}/>
                <h3 className='background-white'>{title}</h3>
                </div>
            </Link>
            </div>
        
    )
}

export default CardTransmission