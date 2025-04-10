import CardContent from "../../Mollecules/CardContent"

const Card = ( {title, desc, text, imgSrc, imgDesc, btnContent, url, label, onClick, descBold} ) => {
    return(
        <div className='card'>
            <CardContent 
            title = {title} 
            desc = {desc}
            text = {text}
            btnContent = {btnContent}
            url = {url}
            label = {label}
            onClick={onClick}
            descBold= {descBold}
            />            
        </div>
    )
}

export default Card