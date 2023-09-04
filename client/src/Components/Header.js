import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import useAuth from '../Hooks/auth.hook'
import * as selectors from '../redux/selectors/user.selectors'

import { FRONT_URL } from '../const'

import styles from '../styles/header.module.css'
import useCommand from '../Hooks/cmd.hook'


function Header({isAuth, isComplite}) {
    const location = useLocation()
    const { pushCmd } = useCommand()
    
    const { logout } = useAuth()

    const user = useSelector(selectors.user)

    const logoutHandler = () => { logout() }

    let isOwnArcle = false
    let isOwnArcleEdit = false
    let isComent = false
    let isSearch = location.pathname === '/profile' || location.pathname === '/'

    const path = location.pathname.split('/')
    if(path.length > 1) {
        const id = path[path.length - 1]
        const arclePath = path[path.length - 2]
        
        if(arclePath === 'arcle') {
            isComent = true
        }

        if(arclePath === 'arcle' && user?.arcles.includes(id)) {
            isOwnArcle = true
        }

        if(arclePath === 'edit' && user?.arcles.includes(id)) {
            isOwnArcleEdit = true
        }

        if(arclePath === 'author') {
            isSearch = true
        }
    }

    return (
        <div className={styles.header}>
            <div className={styles.user}>
                {isAuth && isComplite && <>
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

                    {location.pathname !== '/create' && 
                        <Link to="/create" className={styles.avatar}>
                            <img src={`${FRONT_URL}/icons/arcle.svg`} alt="Auth" />  
                        </Link>
                    }

                    {isOwnArcle && 
                        <a href="#" className={styles.avatar} onClick={() => pushCmd('edit')}>
                            <img src={`${FRONT_URL}/icons/edit.svg`} alt="Auth" />  
                        </a>
                    }

                    {(location.pathname === '/create' || location.pathname === '/update') && <>
                        <a href="#" className={styles.avatar} onClick={() => pushCmd('load')}>
                            <img src={`${FRONT_URL}/icons/image.svg`} alt="Auth" />  
                        </a>

                        <a href="#" className={styles.avatar} onClick={() => pushCmd('save')}>
                            <img src={`${FRONT_URL}/icons/save.svg`} alt="Auth" />  
                        </a>
                    </>}

                    {isOwnArcleEdit && <>
                        <a href="#" className={styles.avatar} onClick={() => pushCmd('load')}>
                            <img src={`${FRONT_URL}/icons/image.svg`} alt="Auth" />  
                        </a>

                        <a href="#" className={styles.avatar} onClick={() => pushCmd('save')}>
                            <img src={`${FRONT_URL}/icons/save.svg`} alt="Auth" />  
                        </a>                    
                    </>}

                    {isComent && 
                        <a href="#" className={styles.avatar} onClick={() => pushCmd('coment')}>
                            <img src={`${FRONT_URL}/icons/comment.svg`} alt="Auth" />  
                        </a>
                    }
                </>}

                {isSearch && 
                    <a href="#" className={styles.avatar} onClick={() => pushCmd('search')}>
                        <img src={`${FRONT_URL}/icons/search.svg`} alt="search" />  
                    </a>
                }
            </div>

            <div className={styles.menu}>
                {(!isAuth || isComplite) && location.pathname !== '/' && <Link to={'/'}>
                    <img src={`${FRONT_URL}/icons/home.svg`} alt="Home" />    
                </Link>}

                {isAuth && location.pathname === '/auth' && <>
                    <a href="#" className={styles.avatar} onClick={() => pushCmd('load')}>
                        <img src={`${FRONT_URL}/icons/image.svg`} alt="Auth" />  
                    </a>

                    <a href="#" className={styles.avatar} onClick={() => pushCmd('save')}>
                        <img src={`${FRONT_URL}/icons/save.svg`} alt="Auth" />  
                    </a>                    
                </>}
            
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