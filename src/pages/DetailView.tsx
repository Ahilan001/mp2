import {Link, useNavigate, useParams} from "react-router-dom";
import {usePokemon} from "../context/pokemoncontext.ts";
import styles from './DetailView.module.css'

function formatHeight(decimeters: number): string{
    const totalInches = Math.round(decimeters * 3.937)
    const feet = Math.floor(totalInches/12)
    const inches = totalInches%12
    return `${feet}' ${inches}"`
}

function DetailView(){
    const {id} = useParams()
    const {pokemon} = usePokemon()
    const navigate = useNavigate()

    const currentIndex = pokemon.findIndex((p) => p.id === Number(id))
    const currentPokemon = currentIndex === -1 ? undefined : pokemon[currentIndex]

    if (!currentPokemon) {
        return (
            <section className={styles.container}>
                <p>No Pokemon found for "{id}".</p>
                <Link to="/">Back to List</Link>
            </section>
        )
    }

    const previous = currentIndex > 0 ? pokemon[currentIndex - 1] : null
    const next = currentIndex < pokemon.length - 1 ? pokemon[currentIndex + 1] : null

    const image = currentPokemon.sprites.other['official-artwork'].front_default

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>
                #{currentPokemon.id} {currentPokemon.name}
            </h2>
            <nav className={styles.pager}>
                <button type="button" className={styles.pagerButton} disabled={!previous}
                        onClick={() => previous && navigate(`/pokemon/${previous.id}`)}>
                    Previous
                </button>
                <button type="button" className={styles.pagerButton} disabled={!next}
                        onClick={() => next && navigate(`/pokemon/${next.id}`)}>
                    Next
                </button>
            </nav>
            {image ? (
                <img src={image} alt={currentPokemon.name} className={styles.image}/>
            ) : (
                <div className={styles.placeholder}>No Image Available</div>
            )}

            <dl className={styles.facts}>
                <dt>Types</dt>
                <dd className={styles.capitalize}>
                    {currentPokemon.types.map((t) => t.type.name).join(' | ')}
                </dd>

                <dt>Height</dt>
                <dd>{formatHeight(currentPokemon.height)}</dd>

                <dt>Weight</dt>
                <dd>{(currentPokemon.weight / 4.536).toFixed(2)} pounds</dd>

                <dt>Base Experience</dt>
                <dd>{currentPokemon.base_experience}</dd>

                <dt>Abilities</dt>
                <dd className={styles.capitalize}>
                    {currentPokemon.abilities.map((a) => (
                        <div key={a.ability.name}>
                            {a.ability.name.replace('-', ' ')}
                            {a.is_hidden && ' (Hidden Ability)'}
                        </div>
                    ))}
                </dd>
            </dl>

            <h3>Base Stats</h3>
            <ul className={styles.stats}>
                {currentPokemon.stats.map((s) => (
                    <li key={s.stat.name} className={styles.stat}>
                        <span className={`${styles.statName} ${styles.capitalize}`}>
                            {s.stat.name.replace('-', ' ')}
                        </span>
                        <span className={styles.statValue}>{s.base_stat}</span>
                        <progress max={255} value={s.base_stat}/>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default DetailView