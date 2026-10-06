import { createContext, useContext} from "react";
import type {PokemonDetail} from "../api/pokeapi.ts";

export interface PokemonContextValue {
    pokemon: PokemonDetail[]
    loading: boolean
    error: string | null
    reload: () => void
}

export const PokemonContext = createContext<PokemonContextValue | null>(null)

export function usePokemon(): PokemonContextValue {
    const context = useContext(PokemonContext)
    if(!context) {
        throw new Error('usePokemon must be inside a Pokemon Provider')
    }
    return context
}