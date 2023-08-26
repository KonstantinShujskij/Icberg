import React, { useEffect } from 'react'

import { FRONT_URL } from '../const'

import styles from '../styles/captcha.module.css'


function Captcha({image, rotate, refresh, rotateLeft, rotateRight, verify}) {
    
    useEffect(() => {
        const load = async () => { await refresh() }

        load().catch() 
    }, [])

    return (
        <div className={styles.main}>
            <div className={styles.bottom}>
                <button className={styles.right} onClick={rotateLeft}>
                    <img src={`${FRONT_URL}/icons/triangle.svg`} alt="right" />
                </button>
                <button className={styles.right} onClick={rotateRight}>
                    <img src={`${FRONT_URL}/icons/circle.svg`} alt="right" />
                </button>
                <button className={styles.right} onClick={() => refresh()}>
                    <img src={`${FRONT_URL}/icons/dismis.svg`} alt="right" />
                </button>
                <button className={styles.right} onClick={verify}>
                    <img src={`${FRONT_URL}/icons/square.svg`} alt="right" />
                </button>
            </div>
            <div className={styles.image} >
                <img src={`data:image/png;base64, ${image}`} 
                    style={{transform: `rotateZ(${rotate * 45}deg)`}} alt="captcha" />
            </div>
        </div>
    )
}

export default Captcha