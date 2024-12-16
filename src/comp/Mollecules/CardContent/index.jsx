import BtnCTA from "../../Atoms/BtnCTA"

const CardContent = ({title, desc, btnContent}) => {
 return(
    <div className='card-content'>
        <h2 style={{ display: title ? 'block' : 'none' }}>{title}</h2>
        <p>{desc}</p>
        <BtnCTA btnContent={btnContent}/>
    </div>
 )       
}

export default CardContent