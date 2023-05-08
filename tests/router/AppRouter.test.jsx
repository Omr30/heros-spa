import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AppRouter from '../../src/router/AppRouter'
import { AuthContext } from '../../src/auth'
import { describe, expect, test } from 'vitest'

describe('Pruebas en <AppRouter />', () => {
    test('debe de mostrar el login sino esta autenticado', () => {
        const contextValue = {
            logged: false,
        }

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>,
        )
        expect(screen.getAllByText('Login').length).toBe(2)
    })

    test('debe de mostrar el componenete de Marvel si esta autenticado', () => {
        const contextValue = {
            logged: true,
            user: {
                id: '123',
                name: 'marc',
            },
        }

        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>,
        )

        // screen.debug()
        expect(screen.getAllByText('Marvel').length).toBeGreaterThanOrEqual(1)
    })
})
