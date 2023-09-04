import { useState } from 'react'

const noop = () => {}

export default function useTouch(move=noop, up=noop) {
    const [mouse, setMouse] = useState({ onClick: false, x: 0, y: 0 }) 

    const clickHandler = (e) => {
        setMouse({ onClick: true, x: e.clientX, y: e.clientY })
    }
  
    const moveHandler = (e) => {
        if(!mouse.onClick) { return }

        const dx = mouse.x - e.clientX
        const dy = mouse.y - e.clientY
        
        move(dx, dy)

        setMouse({ onClick: true, x: e.clientX, y: e.clientY })
    }
  
    const upHandler = () => {  
        setMouse({ onClick: false, x: 0, y: 0 })

        up()
    }

    return { clickHandler, moveHandler, upHandler }
}