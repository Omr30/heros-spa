import { types } from '../../../src/auth/types/types'
import { describe, expect, it } from 'vitest'

describe('Pruebas en "Types.js"', () => {
    it('debe de regresar estos types', () => {
        expect(types).toEqual({
            login: '[Auth] Login',
            logout: '[Auth] Logout',
        })
    })
})
