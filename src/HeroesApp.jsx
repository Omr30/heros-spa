import { AuthProvider } from './auth'
import AppRouter from './router/AppRouter'

const HeroesApp = () => {
    return (
        <AuthProvider>
            <AppRouter />
        </AuthProvider>
    )
}

export default HeroesApp
