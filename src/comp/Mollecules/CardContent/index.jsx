import { Link } from "react-router-dom"
import BtnCTA from "../../Atoms/BtnCTA"

const CardContent = ({title, desc, text, btnContent, url, label}) => {
 return(
    <div className='card-content'>
        <h2 style={{ display: title ? 'block' : 'none' }}>{title}</h2>
        <div className='label'>{label}</div>
        <p>{desc}</p>
        <p>{text}</p>
        <Link to={url}>
            <BtnCTA btnContent={btnContent}/>
        </Link>
    </div>
 )       
}

export default CardContent