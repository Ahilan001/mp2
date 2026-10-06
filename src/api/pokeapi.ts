import axios from 'axios'

const api = axios.create({
    baseURL: 'https://pokeapi.co/api/v2'
})

export interface PokemonListItem{
    name: string
    url: string
}

interface PokemonListResponse{
    count: number
    results: PokemonListItem[]
}

export async function fetchPokemonList(limit: number): Promise<PokemonListItem[]> {
    const response = await api.get<PokemonListResponse>('/pokemon',{
        params: { limit }
    })
    return response.data.results
}

export interface PokemonType{
    slot: number
    type: {
        name: string
    }
}

export interface PokemonStat{
    base_stat: number
    stat: {
        name: string
    }
}

export interface PokemonAbility{
    is_hidden: boolean
    slot: number
    ability: {
        name: string
    }
}

export interface PokemonDetail{
    id: number
    name: string
    height: number
    weight: number
    base_experience: number
    types: PokemonType[]
    stats: PokemonStat[]
    abilities: PokemonAbility[]
    sprites: {
        other:{
            'official-artwork': {
                front_default: string | null
            }
        }
    }
}

const detailCache = new Map<number, Promise<PokemonDetail>>()

export async function fetchPokemonDetail(id:number): Promise<PokemonDetail> {
    const cached = detailCache.get(id)
    if (cached)
        return cached
    const request = api.get<PokemonDetail>(`/pokemon/${id}`)
        .then((response) => response.data)
        .catch((error) => {
            detailCache.delete(id)
            throw error
        })
    detailCache.set(id, request)
    return request
}
export function fetchAllPokemonDetails(limit: number): Promise<PokemonDetail[]> {
    const ids = Array.from({length: limit}, (_, i) => i + 1)
    return Promise.all(ids.map(fetchPokemonDetail))
}