import {useCallback, useEffect, useState, type ReactNode } from "react";
import { fetchAllPokemonDetails, type PokemonDetail } from "../api/pokeapi.ts";
import {PokemonContext} from "./pokemoncontext.ts";

const POKE_LIMIT = 151

export function PokemonProvider({children}: {children: ReactNode}){
    const [pokemon, setPokemon] = useState<PokemonDetail[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [attempt, setAttempt] = useState(0)

    useEffect(() => {
        let cancelled = false
        setLoading(true)
        setError(null)

        fetchAllPokemonDetails(POKE_LIMIT).then((data) => {
            if (!cancelled)
                setPokemon(data)
        }).catch(() => {
            if (!cancelled)
                setError('Could not load Pokemon.')
        }).finally(() => {
            if (!cancelled)
                setLoading(false)
        })
        return () => {
            cancelled = true
        }
    }, [attempt]);
    const reload = useCallback(() => setAttempt((a) => a+1), [])

    return(
        <PokemonContext.Provider value={{pokemon, loading, error, reload}}>
            {children}
        </PokemonContext.Provider>
    )
}

