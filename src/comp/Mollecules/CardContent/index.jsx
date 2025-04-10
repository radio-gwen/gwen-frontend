import { Link } from "react-router-dom"
import BtnCTA from "../../Atoms/BtnCTA"
import Badge from "../../Atoms/Badge"

const CardContent = ({title, desc, text, btnContent, url, label, onClick, descBold = false}) => {
 return(
    <div className='card-content'>
        <h2 style={{ display: title ? 'block' : 'none' }}>{title}</h2>
        <Badge content={label}/>
        <p style={{ fontWeight: descBold ? "bold" : "normal" }}>{desc}</p>
        <p>{text}</p>
        <Link to={url}>
            <BtnCTA btnContent={btnContent} onClick={onClick}/>
        </Link>
    </div>
 )       
}

export default CardContent