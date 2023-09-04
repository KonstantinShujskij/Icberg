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

    let isSearch = location.pathname === '/profile' || location.pathname === '/'
    let isCreate = isAuth && isComplite && location.pathname !== '/create' && location.pathname !== '/update'
    let isProfile = isAuth && isComplite && location.pathname !== '/profile'
    let isUpdateProfile = isAuth && isComplite && location.pathname === '/profile'

    let isWrite = isAuth && isComplite && (location.pathname === '/create' || location.pathname === '/update')
    let isOwnArcleEdit =  false
    let isOwnArcle = false
    let isComent = false
    let isHome = (!isAuth || isComplite) && location.pathname !== '/'
    let isInfo = isAuth && !isComplite && location.pathname === '/auth'
    let isLogout = !isAuth && location.pathname !== '/auth'

    const path = location.pathname.split('/')

    if(path.length > 1) {
        const id = path[path.length - 1]
        const page = path[path.length - 2]
        
        if(isAuth && isComplite && page === 'arcle') { isComent = false}
        if(page === 'author') { isSearch = true }
        if(isAuth && isComplite && page === 'arcle' && user?.arcles.includes(id)) { isOwnArcle = true }
        if(isAuth && isComplite && page === 'edit' && user?.arcles.includes(id)) { isOwnArcleEdit = true }

        if(page === 'edit' || page === 'arcle') { isCreate = false }
    }


    return (
        <div className={styles.header}>
            <div className={styles.user}>
                {isProfile && 
                    <Link to="/profile" className={styles.avatar}>
                        <img src={user.avatarSourse} alt="avatar" />
                    </Link>
                }

                {isUpdateProfile && 
                    <Link to="/update" className={styles.avatar}>
                        <img src={user.avatarSourse} alt="avatar" />
                    </Link>
                }

                {isCreate && 
                    <Link to="/create" className={styles.icon}>
                        <img src={`${FRONT_URL}/icons/arcle.svg`} alt="write" />  
                    </Link>
                }

                {isOwnArcle && 
                    <div className={styles.icon} onClick={() => pushCmd('edit')}>
                        <img src={`${FRONT_URL}/icons/edit.svg`} alt="Auth" />  
                    </div>
                }

                {(isWrite || isOwnArcleEdit || isInfo) && <>
                    <div className={styles.icon} onClick={() => pushCmd('load')}>
                        <img src={`${FRONT_URL}/icons/image.svg`} alt="Load" />  
                    </div>
                
                    <div className={styles.icon} onClick={() => pushCmd('save')}>
                        <img src={`${FRONT_URL}/icons/save.svg`} alt="Save" />  
                    </div>
                </>}

                {isComent && 
                    <div className={styles.icon} onClick={() => pushCmd('coment')}>
                        <img src={`${FRONT_URL}/icons/comment.svg`} alt="coment" />  
                    </div>
                }

                {isSearch && 
                    <div className={styles.icon} onClick={() => pushCmd('search')}>
                        <img src={`${FRONT_URL}/icons/search.svg`} alt="search" />  
                    </div>
                }
            </div>

            <div className={styles.menu}>
                {isHome && 
                    <Link to={'/'} className={styles.icon}>
                        <img src={`${FRONT_URL}/icons/home.svg`} alt="Home" />    
                    </Link>
                }
            
                {isAuth && 
                    <div onClick={logoutHandler} className={styles.icon}>
                        <img src={`${FRONT_URL}/icons/exit.svg`} alt="Logout" />  
                    </div>
                }

                {isLogout && 
                    <Link to={'/auth'} className={styles.icon}>
                        <img src={`${FRONT_URL}/icons/auth.svg`} alt="Auth" />    
                    </Link>
                }
            </div>
        </div>
    )
}

export default Header