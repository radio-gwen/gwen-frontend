import { useOutletContext } from "react-router-dom"

import FormTransNew from "../../Organisms/FormTransNew"
import FormTransUpdate from "../../Organisms/FormTransUpdate"
import FormEventNew from "../../Organisms/FormEventNew"
import FormEventsUpdate from "../../Organisms/FormEventsUpdate"

import BlockCenter from "../../Organisms/BlockCenter"

const BoardForm = () => {

    const {type, id, transmissionsData, eventsData} = useOutletContext()
    

    const numiricId = Number(id)
    const transmission = transmissionsData.find(trans => trans.id_old === numiricId)
    const event = eventsData.find(event => event.id_old === numiricId)


    return (
        
        <BlockCenter background='background-white'>
            {type === 'trans' && numiricId === 0 && <FormTransNew />}
            {type === 'trans' && numiricId != 0 && <FormTransUpdate transmission={transmission} />}
            {type === 'event' && numiricId === 0 && <FormEventNew />}
            {type === 'event' && numiricId != 0 && <FormEventsUpdate event={event} />}
        </BlockCenter>

    )
}

export default BoardForm;
