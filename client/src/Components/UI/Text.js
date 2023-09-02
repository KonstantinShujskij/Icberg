import React from 'react'

import styles from '../../styles/input.module.css'


function Input({input, className='', placeholder='', type='text'}) {
    return (
        <div className={styles.main}>
            <textarea {...input.bind}
                className={`${styles.input} ${className}`} 
                placeholder={placeholder} 
                type={type}
                title={input.tooltip}
            />
            {!input.valid && <div className={styles.tooltip}>{input.tooltip}</div>}
        </div>
    )
}

export default Input