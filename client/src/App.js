import {useRoutes} from './Routes/routes'
import { useSelector } from 'react-redux'

import * as authSelectors from './redux/selectors/auth.selectors'
import * as userSelectors from './redux/selectors/user.selectors'

import Header from './Components/Header'

import './styles/app.css'
import Alert from './Components/Alert'


function App() {
    const isAuth = useSelector(authSelectors.isAuth)
    const isComplite = useSelector(userSelectors.isComplite)

    const routes = useRoutes(isAuth, isComplite)

    return (
        <div className="app">
            <Header isAuth={isAuth} isComplite={isComplite} />
            {routes}
            <Alert />
        </div>
    )
}

export default App
