import {useRoutes} from './Routes/routes'
import { useSelector } from 'react-redux'

import * as authSelectors from './redux/selectors/auth.selectors'
import * as userSelectors from './redux/selectors/user.selectors'

import Header from './Components/Header'

import './styles/app.css'
import Alert from './Components/Alert'

import { useEffect, useState } from 'react'
import Cube from './Components/Cube'
import Touch from './Components/Touch'
import useCube from './Hooks/cube.hook'
import useTouch from './Hooks/touch.hook'



function App() {
    const isAuth = useSelector(authSelectors.isAuth)
    const isComplite = useSelector(userSelectors.isComplite)

    const routes = useRoutes(isAuth, isComplite)

    const mainCube = useCube()
    const smallCube = useCube()
  
    const rotateCubes = (dx, dy) => {
        const W = Math.min(window.innerHeight, window.innerWidth)
  
        const x = dx / W
        const y = dy / W
  
        mainCube.rotate(x, y)
        smallCube.rotate(x, y)
    }
  
    const compliteCubes = () => {
        smallCube.complite()
  
        const duration = 600
        mainCube.cubeElement.current.style.transition = `${duration}ms ease`
        mainCube.complite()
        setTimeout(() => { mainCube.cubeElement.current.style.transition = '0ms ease' }, duration)       
    }
  
    const touch = useTouch(rotateCubes, compliteCubes)
  
    const [isRotation, setIsRotation] = useState(false)
  
    const toggle = () => {
        if(isRotation) { 
            mainCube.translate(0) 
            mainCube.activate()
        }
        else { 
            mainCube.translate(-500)
            mainCube.diactivate()
        }
    
        setIsRotation((prev) => !prev)
    }
  
    useEffect(() => { mainCube.activate() }, [])
  

    const Iceberg = <>
        <div className="icberg">
            <Header isAuth={isAuth} isComplite={isComplite} />
            {routes}
            <Alert />
        </div>
    </>

    const Front = <>
        <div className="front-con">
            <div className="click" onClick={toggle}>Click Me</div>
        </div>
    </>

    return (
        <div className="app">
            <div className="main">
                <Cube
                    cube={mainCube}
                    front={Front}
                    back={Iceberg}
                    bottom={'BM'}
                    top={'TP'}
                    left={'LT'}
                    right={'RT'}
                />
            </div>

            <div className="small" onClick={toggle}>
                <Cube cube={smallCube} front={'FT'} back={'BK'} bottom={'BM'} top={'TP'} left={'LT'} right={'RT'} />
            </div>

            <div className={!isRotation? 'hide' : null}>
                <Touch touch={touch} />
            </div>      
        </div>
    )
}

export default App
