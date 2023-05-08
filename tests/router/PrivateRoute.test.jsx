import { render, screen } from '@testing-library/react'
import { AuthContext } from '../../src/auth'
import { PrivateRoute } from '../../src/router/PrivateRoute'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test, vi } from 'vitest'

describe('Pruebas en <PrivateRoute />', () => {
    // Storage.prototype.setItem = jest.fn()
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')

    test('debe de mostrar el children si esta autenticado', () => {
        const contextValue = {
            logged: true,
            user: {
                id: 'abc',
                name: 'Ozk',
            },
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/search?q=batman']}>
                    <PrivateRoute>
                        <h1>Ruta privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>,
        )

        expect(screen.getByText('Ruta privada')).toBeTruthy()
        expect(setItemSpy).toHaveBeenCalledWith('lastPath', '/search?q=batman')
    })
})
