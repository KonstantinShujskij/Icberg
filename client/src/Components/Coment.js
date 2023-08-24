import React from 'react'
import { Link } from 'react-router-dom'
import { formatTime } from '../Utils/time.utils'


function Coment({ coment }) {
    return (
        <div>
            <div>{coment.text}</div>
            <div>{formatTime(coment.createdAt)}</div>
            <div>
                Author: <Link to={`/author/${coment.author}`}>{coment.authorName}</Link>
            </div>
        </div>
    )
}

export default Coment