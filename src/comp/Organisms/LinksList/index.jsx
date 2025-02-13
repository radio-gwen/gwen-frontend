import { Link } from "react-router-dom"

const LinksList = ({data, text, url, key, onClick}) => {

    console.log({data})

    return(
        <div className='links-list '>
            <ul>
                {data.map( (item, index) =>
                <li key={item.index} onClick={onClick}>
                    <Link to={url[index]}> {text[index]} </Link>
                </li>
                )}
            </ul>
        </div>
    )
}

export default LinksList