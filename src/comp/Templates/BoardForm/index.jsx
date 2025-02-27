import axios from "axios"
import { useState } from "react"
import { useOutletContext } from "react-router-dom"

import FormTransNew from "../../Organisms/FormTransNew"
import FormTransUpdate from "../../Organisms/FormTransUpdate"

import BlockCenter from "../../Organisms/BlockCenter"

const BoardForm = () => {

    const {type, id, transmissionsData} = useOutletContext()

    const numiricId = Number(id)
    const transmission = transmissionsData.find(trans => trans.id_old === numiricId)



    return (
        
        <BlockCenter background='background-white'>
            {type === 'trans' && numiricId === 0 && <FormTransNew />}
            {type === 'trans' && numiricId != 0 && <FormTransUpdate transmission={transmission} />}
        </BlockCenter>

    )
}

export default BoardForm;
