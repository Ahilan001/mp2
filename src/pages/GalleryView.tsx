import {Link} from "react-router-dom";
import {usePokemon} from "../context/pokemoncontext.ts";
import styles from './GalleryView.module.css'
import {useState} from "react";

function GalleryView(){
    const {pokemon} = usePokemon()
    const [selectedTypes, setSelectedTypes] = useState<string[]>([])
    const allTypes = Array.from(
        new Set(pokemon.flatMap((p) => p.types.map((t) => t.type.name)))
    ).sort()

    const toggleType = (type: string) => {
        setSelectedTypes((current) => current.includes(type) ? current.filter((t) => t !== type) : [...current, type]
        )
    }

    const filtered = selectedTypes.length === 0 ? pokemon : pokemon.filter((p) => p.types.some((t) => selectedTypes.includes(t.type.name)))

    return (
        <section className={styles.container}>
            <h2>Pokemon Gallery</h2>

            <div className={styles.filters}>
                {allTypes.map((type) => (
                    <button key={type} type="button"
                            aria-pressed={selectedTypes.includes(type)}
                            className={`${styles.chip} ${selectedTypes.includes(type) ? styles.activeChip : ''}`}
                            onClick={() => toggleType(type)}>
                        {type}
                    </button>
                ))}
            </div>

            <p className={styles.count}>Showing {filtered.length} of {pokemon.length} results.</p>

            <ul className={styles.grid}>
                {filtered.map((p) => {
                    const image = p.sprites.other['official-artwork'].front_default
                    return(
                        <li key={p.id}>
                            <Link to={`/pokemon/${p.id}`} className={styles.card}>
                                {image ? (
                                    <img src={image} alt={p.name} loading="lazy" className={styles.image}/>
                                ):(
                                    <div className={styles.placeholder}>No Image Available</div>
                                )}
                                <span className={styles.name}>#{p.id} {p.name}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

export default GalleryView