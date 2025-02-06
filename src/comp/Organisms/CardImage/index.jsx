import CardContent from "../../Mollecules/CardContent"
import ImageIdBox from "../../Atoms/ImageIdBox"

const CardImage = ( {title, desc, text, imgSrc, imgDesc, btnContent, url, label} ) => {
    return(
        <div className='card'>
            <CardContent 
            title = {title} 
            desc = {desc}
            text = {text}
            btnContent = {btnContent}
            url = {url}
            label = {label}
            />
            
            <ImageIdBox src={imgSrc} alt={imgDesc}/>
            
        </div>
    )
}

export default CardImage