import React from 'react'
import useComentApi from '../API/coment.api'
import useInput from '../Hooks/input.hook'


function ComentForm({arcleId, update}) {
    const { createComent } = useComentApi()
    const text = useInput('')

    const createHandle = async () => {
        const create = await createComent(arcleId, text.value)

        if(create) { update() }
    }

    return (
        <div>
            <h3>Your coment</h3>
            <input {...text.bind} pattern="coment..." />
            <button onClick={() => createHandle()}>Create</button>
        </div>
    )
}

export default ComentForm