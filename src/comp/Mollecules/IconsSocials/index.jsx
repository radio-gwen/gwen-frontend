import IconSocials from "../../Atoms/IconSocials"
import socialsList from "../../../data/socialsList"

const IconsSocials = () => {
    return (
        <div className="flex-horiz">
            {socialsList.map( social => 
                <a
                key= {social.id}
                href= {social.link}
                >
                <IconSocials svg={social.svg} size='32px' />
                </a>
            )
            }
        </div>
    )
}

export default IconsSocials