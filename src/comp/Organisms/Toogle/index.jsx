import { useState } from "react"
import ArrowSmall from "../../Atoms/Svg/ArrowSmall"

const Toogle = ({children, id, title}) => {

    const [isOpen, setIsOpen] = useState(false)

    const toogle = () => {
        setIsOpen(!isOpen)
    }

    return(
        <div key={`toogle-${id}`} className='card-toogle' >
            <div className="flex-horiz hover-cta" onClick={() => toogle()}>
                <ArrowSmall isOpen={isOpen}/>
                <span>{title}</span>
            </div>
            <div c >
                {children}
            </div>
        </div>
    )
}

export default Toogle