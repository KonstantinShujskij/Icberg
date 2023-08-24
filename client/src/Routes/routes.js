import notAuthRoutes from "./notAuth.routes"
import authRoutes from "./auth.routes"
import notCompliteRoutes from "./notComplite.routes"


export const useRoutes = (isAuth, isComplite) => {
    if(isAuth) {
        if(!isComplite) { return notCompliteRoutes }

        return authRoutes
    }

    return notAuthRoutes
}