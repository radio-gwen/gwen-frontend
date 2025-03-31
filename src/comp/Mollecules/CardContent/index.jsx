import { Link } from "react-router-dom"
import BtnCTA from "../../Atoms/BtnCTA"
import Badge from "../../Atoms/Badge"

const CardContent = ({title, desc, text, btnContent, url, label}) => {
 return(
    <div className='card-content'>
        <h2 style={{ display: title ? 'block' : 'none' }}>{title}</h2>
        <Badge content={label}/>
        <p>{desc}</p>
        <p>{text}</p>
        <Link to={url}>
            <BtnCTA btnContent={btnContent}/>
        </Link>
    </div>
 )       
}

export default CardContent