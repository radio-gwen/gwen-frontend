import CardContent from "../../Mollecules/CardContent"

const Card = ( {title, desc, imgSrc, imgDesc, btnContent} ) => {
    return(
        <div className='card'>
            <CardContent 
            title={title} 
            desc ={desc}
            btnContent= {btnContent}
            />
            <img src={imgSrc} alt={imgDesc} />
        </div>
    )
}

export default Card