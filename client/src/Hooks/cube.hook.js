import { useRef, useState } from 'react'


// Sides
const front = 'front'
const back = 'back'
const top = 'top'
const bottom = 'bottom'
const left = 'left'
const right = 'right'

// Rotate Matrix
const RM = [
    [
        [front, front, front, front], 
        [left, bottom, right, top],
        [back, back, back, back],
        [right, top, left, bottom]
    ], 
    [
        [bottom, right, top, left], 
        [bottom, right, top, left],
        [bottom, right, top, left],
        [bottom, right, top, left]
    ], 
    [
        [back, back, back, back], 
        [right, top, left, bottom],
        [front, front, front, front],
        [left, bottom, right, top]
    ], 
    [
        [top, left, bottom, right], 
        [top, left, bottom, right],
        [top, left, bottom, right],
        [top, left, bottom, right]
    ]
] 

// Transform Rotate Matrix
const TRM = [
    [
        [0, -90, 180, 90],
        [0, -90, 180, 90],
        [0, 90, 180, -90],
        [0, -90, 180, 90]
    ],
    [
        [0, -90, 180, 90],
        [0, 0, 0, 0],
        [180, 90, 0, -90],
        [0, 0, 0, 0]
    ],
    [
        [180, -90, 0, 90],
        [180, 90, 0, -90],
        [180, 90, 0, -90],
        [180, 90, 0, -90]
    ],
    [
        [0, -90, 180, 90],
        [0, 0, 0, 0],
        [180, 90, 0, -90],
        [0, 0, 0, 0]
    ]
]

const getAxisRotate = (nrx, nry) => {
    if(nrx == 0) { return {dx: {x: 0, y: 1}, dy: {x: -1, y: 0}, dz: {x: 0, y: 0}} }
    if(nrx == 2) { return {dx: {x: 0, y: 1}, dy: {x: 1, y: 0}, dz: {x: 0, y: 0}} }
    
    if(nry == 0) { return {dx: {x: 0, y: 1}, dy: {x: 0, y: 0}, dz: {x: 1, y: 0}} }
    if(nry == 2) { return {dx: {x: 0, y: 1}, dy: {x: 0, y: 0}, dz: {x: -1, y: 0}} }

    return {dx: {x: 0, y: 0}, dy: {x: 0, y: 0}, dz: {x: 0, y: 0}}
}


export default function useCube() {
    const [speed, setSpeed] = useState(100) 
    const [z, setZ] = useState(0)
    const [rx, setRx] = useState(0)
    const [ry, setRy] = useState(0)
    const [rz, setRz] = useState(0)

    const [activeSide, setActiveSide] = useState(front)
    const [sideAngles, setSideAngles] = useState({ front: 0, bottom: 0, back: 0, top: 0, left: 0, right: 0 }) 

    const getRound = (tx, ty, tz) => {
        const nx = Math.round(tx / 90) * 90
        const ny = Math.round(ty / 90) * 90
        const nz = Math.round(tz / 90) * 90

        return { nx, ny, nz }
    }

    const getResidue = (tx, ty, tz) => {
        const { nx, ny, nz } = getRound(tx, ty, tz)

        let nrx = (nx / 90) % 4
        let nry = (ny / 90) % 4
        let nrz = (nz / 90) % 4
        
        nrx = nrx < 0? 4 + nrx : nrx
        nry = nry < 0? 4 + nry : nry
        nrz = nrz < 0? 4 + nrz : nrz

        return { nrx, nry, nrz }
    }

    const getSide = (tx, ty, tz) => {
        const { nrx, nry, nrz } = getResidue(tx, ty, tz)

        return RM[nrx][nry][nrz]
    }

    const getRotate = (tx, ty, tz) => {
        const { nrx, nry, nrz } = getResidue(tx, ty, tz)
        
        return TRM[nrx][nry][nrz]
    }

    const translate = (n) => { setZ(n) }

    const rotate = (dx, dy) => {
        const { nrx, nry } = getResidue(rx, ry, rz)

        const M = getAxisRotate(nrx, nry)

        setRx((prev) => prev + (M.dx.x * dx + M.dx.y * dy) * speed)
        setRy((prev) => prev + (M.dy.x * dx + M.dy.y * dy) * speed)
        setRz((prev) => prev + (M.dz.x * dx + M.dz.y * dy) * speed)
    }

    const complite = () => {
        const { nrx, nry } = getResidue(rx, ry, rz)
        let { nx, ny, nz } = getRound(rx, ry, rz)

        if((nrx == 1 || nrx == 3) && (nry == 1 || nry == 3)) { ny -= 90 }

        setRx(nx)
        setRy(ny)
        setRz(nz)        

        const side = getSide(nx, ny, nz)
        const angle = getRotate(nx, ny, nz)

        setActiveSide(side)

        setSideAngles((prev) => {
            const newAngles = {...prev}
            newAngles[side] = angle 
            return newAngles
        })
    }

    const wrapElement = useRef(null)
    const cubeElement = useRef(null)

    const sides = {
        front: { element: useRef(null), content: useRef(null) },
        back: { element: useRef(null), content: useRef(null)  },
        top: { element: useRef(null), content: useRef(null)  },
        bottom: { element: useRef(null), content: useRef(null)  },
        left: { element: useRef(null), content: useRef(null) },
        right: { element: useRef(null), content: useRef(null)  }
    }

    const activate = () => {
        if(!activeSide) return

        for(let sideName in sides) { sides[sideName].element.current.classList.add('hide') }
        sides[activeSide].element.current.classList.remove('hide')
        sides[activeSide].element.current.classList.add('side__active')
    }    

    function diactivate() {
        if(!activeSide) return

        sides[activeSide].element.current.classList.remove('side__active')
        for(let sideName in sides) { sides[sideName].element.current.classList.remove('hide') }
        sides[activeSide].content.current.scroll({ top: 0, left: 0, behavior: 'smooth' })
    }

    return { 
        wrapElement, cubeElement, 
        sides, sideAngles,
        activate, diactivate,
        translate, rotate, complite, setSpeed,
        z, rx, ry, rz
    }
}