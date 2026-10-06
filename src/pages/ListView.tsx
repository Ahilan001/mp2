import {useState} from "react";
import {Link} from "react-router-dom";
import {usePokemon} from "../context/pokemoncontext.ts";
import styles from "./ListView.module.css"

type SortKey = 'id' | 'name' | 'height' | 'weight' | 'base_experience'
type SortOrder = 'asc' | 'desc'

function ListView(){
    const { pokemon } = usePokemon()
    const [query, setQuery] = useState('')
    const [sortKey, setSortKey] = useState<SortKey>('id')
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

    const filtered = pokemon.filter((p)=> {
        const search = query.trim().toLowerCase()
        const nameSearch = p.name.includes(search)
        const dexSearch = p.id.toString().includes(search)
        const typeSearch = p.types.some((t) => t.type.name.includes(search))
        return nameSearch || dexSearch || typeSearch
    })

    const sorted = [...filtered].sort((a, b) => {
        const result = sortKey === 'name' ? a.name.localeCompare(b.name) : a[sortKey] - b[sortKey]
        return sortOrder === 'asc' ? result : -result
    })

    return (
        <section className={styles.container}>
            <h2>Pokemon List</h2>
            <input type="search" className={styles.search} placeholder="Search your Pokemon by name or dex number, or type!" value={query} onChange={(e) => setQuery(e.target.value)}/>

            <div className={styles.control}>
                <label>
                    Sort by{' '}
                    <select value={sortKey} onChange={(e) => setSortKey(e.target.value as SortKey)}>
                        <option value="id">Dex Number</option>
                        <option value="name">Name</option>
                        <option value="height">Height</option>
                        <option value="weight">Weight</option>
                        <option value="base_experience">Base Experience</option>
                    </select>
                </label>
                <div className={styles.buttons}>
                    <button type="button" className={`${styles.button} ${sortOrder === 'asc' ? styles.activeButton : ''}`} onClick={() => setSortOrder('asc')}>
                        Ascending
                    </button>
                    <button type="button" className={`${styles.button} ${sortOrder === 'desc' ? styles.activeButton : ''}`} onClick={() => setSortOrder('desc')}>
                        Descending
                    </button>
                </div>
            </div>

            {sorted.length === 0 ? (
                <p>No Pokemon matches your query</p>
            ): (
                <ul className={styles.list}>
                    {sorted.map((p) => (
                        <li key={p.id}>
                            <Link to={`/pokemon/${p.id}`} className={styles.item}>
                                <span className={styles.id}>#{p.id}</span>
                                <span className={styles.name}>{p.name}</span>
                                <span className={styles.types}>{p.types.map((t) => t.type.name).join(', ')}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}

export default ListView