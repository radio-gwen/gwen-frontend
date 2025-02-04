import { useState } from "react"
import ArrowSmall from "../../Atoms/Svg/ArrowSmall"

const Toogle = ({children, id, title}) => {

    const [isOpen, setIsOpen] = useState(false)

    const toogle = () => {
        setIsOpen(!isOpen)
        console.log('isOpen')
    }

    return(
        <div key={`toogle-${id}`} className='card-toogle' >
            <div className="flex-horiz" onClick={() => toogle()}>
                <ArrowSmall isOpen={isOpen}/>
                <span>{title}</span>
            </div>
            <div className={isOpen ? 'open card-content' : 'closed'} >
                {children}
            </div>
        </div>
    )
}

export default Toogle