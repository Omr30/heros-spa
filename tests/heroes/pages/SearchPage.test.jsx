import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { SearchPage } from '../../../src/heroes/pages'
import { describe, expect, test, vi, beforeEach } from 'vitest'

const mockedUseNavigate = vi.fn()

vi.mock('react-router-dom', async () => ({
    ...(await vi.importActual('react-router-dom')),
    useNavigate: () => mockedUseNavigate,
}))

describe('Pruebas en <SearchPage />', () => {
    beforeEach(() => vi.clearAllMocks())

    test('debe de mostrarse correctamente con valores por defecto', () => {
        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>,
        )
        expect(container).toMatchSnapshot()
    })

    test('debe de mostrar a Batman y el input con el valor del queryString', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>,
        )
        const input = screen.getAllByRole('textbox')
        expect(input[1].value).toBe('batman')

        const img = screen.getAllByRole('img')
        expect(img[0].src).toContain(
            'https://omr30.github.io/heros-spa/heroes/dc-batman.jpg',
        )
    })

    test('debe de mostrar display none heroSearch', () => {
        const { container } = render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>,
        )

        const search = container.querySelector('#heroSearch')
        expect(search.style.display).toBe('none')
    })

    test('debe de mostrar display none heroError', () => {
        const { container } = render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>,
        )

        const search = container.querySelector('#heroError')
        expect(search.style.display).toBe('none')
    })

    test('debe de mostrarse si no se encuentra el hero (batman123)', () => {
        const { container } = render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>,
        )

        const search = container.querySelector('#heroError')
        expect(search.style.display).toBe('')
    })

    test('debe de llamar el navigate a la pantalla nueva', () => {
        const inputValue = 'superman'

        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>,
        )

        const input = screen.getAllByRole('textbox')
        fireEvent.change(input[5], {
            target: { name: 'searchText', value: inputValue },
        })

        const form = screen.getAllByRole('form')
        fireEvent.submit(form[5])

        expect(mockedUseNavigate).toHaveBeenCalledWith(`?q=${inputValue}`)
    })
})
