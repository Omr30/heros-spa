import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test, vi, beforeEach } from 'vitest'
import { AuthContext } from '../../../src/auth'
import { Navbar } from '../../../src/ui'

const mockedUseNavigate = vi.fn()

vi.mock('react-router-dom', async () => ({
    ...(await vi.importActual('react-router-dom')),
    useNavigate: () => mockedUseNavigate,
}))

describe('Pruebas en <Navbar />', () => {
    const contextValue = {
        logged: true,
        user: {
            id: '123',
            name: 'Mvrk',
        },
        logout: vi.fn(),
    }

    beforeEach(() => vi.clearAllMocks())

    test('debe de mostrar el nombre del usuario', () => {
        render(
            <MemoryRouter>
                <AuthContext.Provider value={contextValue}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>,
        )

        expect(screen.getByText(contextValue.user.name)).toBeTruthy()
    })

    test('debe de llamar el logout y navigate cuando se hace click en el boton', () => {
        render(
            <MemoryRouter>
                <AuthContext.Provider value={contextValue}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>,
        )

        const logoutBtn = screen.getAllByRole('button')
        fireEvent.click(logoutBtn[0])

        expect(contextValue.logout).toHaveBeenCalled()
        expect(mockedUseNavigate).toHaveBeenCalledWith('/login', {
            replace: true,
        })
    })
})
