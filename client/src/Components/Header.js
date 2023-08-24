import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import useAuth from '../Hooks/auth.hook'
import * as selectors from '../redux/selectors/user.selectors'

import styles from '../styles/header.module.css'


function Header({isAuth, isComplite}) {
    const { logout } = useAuth()

    const user = useSelector(selectors.user)

    const logoutHandler = () => { logout() }

    return (
        <div className={styles.header}>
            {isAuth && isComplite &&
            <div className={styles.user}>
                <div className={styles.avatar}>
                    <img src={user.avatarSourse} alt="avatar" />
                </div>
                <Link to="/profile" className={styles.profile}>Profile</Link>
            </div>
            }
            <div className={styles.menu}>
                {(!isAuth || isComplite) && <Link to={'/'}>Home</Link>}
            
                {isAuth && <div onClick={logoutHandler}>Log Out</div>}
                {!isAuth && <Link to={'/auth'}>Auth</Link>}
            </div>
        </div>
    )
}

export default Header