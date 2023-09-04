import React from 'react'

import '../styles/cube.css'

function Cube({cube, top, back, front, bottom, right, left}) {
    return (
        <div className="wraper" ref={cube.wrapElement}>
            <div 
                className="cube" 
                ref={cube.cubeElement}
                style={{ transform: `translateZ(${cube.z}px) rotateX(${cube.rx}deg) rotateY(${cube.ry}deg) rotateZ(${cube.rz}deg)` }}
            >
                <div className="side top" ref={cube.sides.top.element} >
                    <div className="side__content"
                        ref={cube.sides.top.content} 
                        style={{ transform: `rotateZ(${cube.sideAngles.top}deg)`}}
                    >
                        { top }
                    </div>
                </div>
                <div className="side back" ref={cube.sides.back.element}>
                    <div className="side__content"
                        ref={cube.sides.back.content} 
                        style={{ transform: `rotateZ(${cube.sideAngles.back}deg)`}}
                    >
                        { back }
                    </div>
                </div>
                <div className="side front" ref={cube.sides.front.element}>
                    <div className="side__content"
                        ref={cube.sides.front.content} 
                        style={{ transform: `rotateZ(${cube.sideAngles.front}deg)`}}
                    >
                        { front }
                    </div>
                </div>
                <div className="side bottom" ref={cube.sides.bottom.element}>
                    <div className="side__content" 
                        ref={cube.sides.bottom.content} 
                        style={{ transform: `rotateZ(${cube.sideAngles.bottom}deg)`}}
                    >
                        { bottom }
                    </div>
                </div>
                <div className="side right" ref={cube.sides.right.element}>
                    <div className="side__content" 
                        ref={cube.sides.right.content}
                        style={{ transform: `rotateZ(${cube.sideAngles.right}deg)`}}
                    >
                        { right }
                    </div>
                </div>
                <div className="side left"ref={cube.sides.left.element}>
                    <div className="side__content" 
                        ref={cube.sides.left.content} 
                        style={{ transform: `rotateZ(${cube.sideAngles.left}deg)`}}
                    >
                        { left }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cube