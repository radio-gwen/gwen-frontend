import { useOutletContext } from "react-router-dom"

const FormTransmission = () => {

    const {formType} = useOutletContext()

    return(
        <div>
            {formType?.type}
            {formType?.id}
        </div>
    )
}

export default FormTransmission