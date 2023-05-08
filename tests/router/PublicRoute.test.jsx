import { render, screen } from '@testing-library/react'
import { PublicRouter } from '../../src/router/PublicRoute'
import { AuthContext } from '../../src/auth'
import { MemoryRouter } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { describe, expect, test } from 'vitest'

describe('Pruebas en <PublicRoute />', () => {
    test('debe de mostrar el children si no esta autenticado', () => {
        const contextValue = {
            logged: false,
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRouter>
                    <h1>Ruta publica</h1>
                </PublicRouter>
            </AuthContext.Provider>,
        )

        expect(screen.getByText('Ruta publica')).toBeTruthy()
    })

    test('debe de navegar si esta autenticado', () => {
        const contextValue = {
            logged: true,
            user: {
                name: 'Mvrk',
                id: '123',
            },
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route
                            path="login"
                            element={
                                <PublicRouter>
                                    <h1>Ruta publica</h1>
                                </PublicRouter>
                            }
                        />
                        <Route
                            path="marvel"
                            element={<h1>Pagina de marvel</h1>}
                        />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>,
        )

        expect(screen.getByText('Pagina de marvel')).toBeTruthy()
    })
})
