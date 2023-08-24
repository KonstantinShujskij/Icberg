import React, { useEffect } from 'react'

import styles from '../styles/captcha.module.css'


function Captcha({image, rotate, refresh, rotateLeft, rotateRight}) {
    
    useEffect(() => {
        const load = async () => { await refresh() }

        load().catch() 
    }, [])

    return (
        <div>
            <div className={styles.main}>
                <button className={styles.right} onClick={rotateLeft}>
                    <i className="fa-solid fa-rotate-left"></i>
                </button>

                <div 
                    className={styles.image} 
                    style={{transform: `rotateZ(${rotate * 45}deg)`}}
                    onClick={() => refresh()}
                >
                    <img src={`data:image/png;base64, ${image}`} alt="captcha" />
                </div>

                <button className={styles.right} onClick={rotateRight}>
                    <i className="fa-solid fa-arrow-rotate-right"></i>
                </button>
            </div>
        </div>
    )
}

export default Captcha