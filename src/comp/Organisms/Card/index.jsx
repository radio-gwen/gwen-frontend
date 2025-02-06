import CardContent from "../../Mollecules/CardContent"

const Card = ( {title, desc, text, imgSrc, imgDesc, btnContent, url, label} ) => {
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
        </div>
    )
}

export default Card