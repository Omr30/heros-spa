import { types } from '../../../src/auth/types/types'
import { authReducer } from '../../../src/auth'
import { describe, expect, it } from 'vitest'

describe('Pruebas en authReducer', () => {
    it('debe retornar el estado por defecto', () => {
        const state = authReducer({ logged: false }, {})
        expect(state).toEqual({ logged: false })
    })
    it('debe de (login) llamar el login autenticar y establecer el user', () => {
        const action = {
            type: types.login,
            payload: {
                name: 'Juan',
                id: '123',
            },
        }

        const state = authReducer({ logged: false }, action)
        expect(state).toEqual({
            logged: true,
            user: action.payload,
        })
    })
    it('debe de (logout) borrar el name del usuario y logged en false', () => {
        const state = {
            logged: true,
            user: { id: '123', name: 'Juan' },
        }

        const action = {
            type: types.logout,
        }

        const newState = authReducer(state, action)
        expect(newState).toEqual({
            logged: false,
        })
    })
})
