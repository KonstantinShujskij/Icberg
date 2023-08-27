import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import useAuth from '../Hooks/auth.hook'
import * as selectors from '../redux/selectors/user.selectors'

import { FRONT_URL } from '../const'

import styles from '../styles/header.module.css'


function Header({isAuth, isComplite}) {
    const location = useLocation()
    
    const { logout } = useAuth()

    const user = useSelector(selectors.user)

    const logoutHandler = () => { logout() }

    return (
        <div className={styles.header}>
            {isAuth && isComplite &&
                <div className={styles.user}>
                    {location.pathname !== '/profile' &&
                        <Link to="/profile" className={styles.avatar}>
                            <img src={user.avatarSourse} alt="avatar" />
                        </Link>
                    }

                    {location.pathname === '/profile' &&
                        <Link to="/update" className={styles.avatar}>
                            <img src={user.avatarSourse} alt="avatar" />
                        </Link>
                    }

                    <Link to="/create" className={styles.avatar}>
                        <img src={`${FRONT_URL}/icons/arcle.svg`} alt="Auth" />  
                    </Link>
                </div>
            }
            <div className={styles.menu}>
                {(!isAuth || isComplite) && location.pathname !== '/' && <Link to={'/'}>
                    <img src={`${FRONT_URL}/icons/home.svg`} alt="Home" />    
                </Link>}
            
                {isAuth && <a href="#" onClick={logoutHandler}>
                    <img src={`${FRONT_URL}/icons/exit.svg`} alt="Auth" />  
                </a>}
                {!isAuth && location.pathname !== '/auth' && <Link to={'/auth'}>
                    <img src={`${FRONT_URL}/icons/auth.svg`} alt="Auth" />    
                </Link>}
            </div>
        </div>
    )
}

export default Header