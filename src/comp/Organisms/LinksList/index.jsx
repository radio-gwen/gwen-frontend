import { useState } from "react"
import { Link } from "react-router-dom"
import BtnTertiary from "../../Atoms/BtnTertiary"

const LinksList = ({data, text, url, key, onClick}) => {

    const [visibleCount, setVisibleCount] = useState(20)

    const loadMore = () => {
        setVisibleCount(prevCount => Math.min(prevCount + 20, data.length))
    }

    return(
        <div className='links-list '>
            <ul>
                {data.slice(0, visibleCount).map( (item, index) =>
                <li key={item.index} onClick={onClick}>
                    <Link to={url[index]}> {text[index]} </Link>
                </li>
                )}
            </ul>

            {visibleCount < data.length && (
                <BtnTertiary 
                content = 'scarica di più!'
                onClick = {loadMore}
                />
            
            )}

        </div>
    )
}

export default LinksList