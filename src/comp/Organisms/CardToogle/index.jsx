import { useState } from "react"
import ArrowSmall from "../../Atoms/Svg/ArrowSmall"


const CardToogle = ({children, title, desc, btnContent, id}) => {

    const [ isOpen, setIsOpen ] = useState(false)

    const toogle = () => {
        setIsOpen(!isOpen)
    }

    return(
        <div className='card-toogle' onClick={ () => toogle()}>
            <div key={id} className='flex-horiz'>
                <ArrowSmall isOpen={isOpen}/>
                <span>{title}</span>
            </div>
           <div className={isOpen ? 'open' : 'closed'}>
            {children}
           </div>
        </div>
    )
}

export default CardToogle