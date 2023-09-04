import React from 'react'

function Touch({ touch }) {
    return (
        <div 
            className="glass"
            onMouseDown={touch.clickHandler} 
            onMouseMove={touch.moveHandler} 
            onMouseUp={touch.upHandler} 
            onMouseLeave={touch.upHandler}

            onTouchStart={(e) => touch.clickHandler(e.touches[0]) }
            onTouchMove={(e) => touch.moveHandler(e.touches[0]) }
            onTouchEnd={touch.upHandler}
        ></div>
    )
}

export default Touch