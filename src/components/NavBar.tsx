import {Link, NavLink} from "react-router-dom";
import styles from './NavBar.module.css'

function NavBar() {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>
                <Link to="/" className={styles.titleLink}>The PokeAPI Pokedex!</Link>
            </h1>
            <nav className={styles.nav}>
                <NavLink to="/" end className={({isActive}) => isActive ? styles.active : styles.link}>
                    List
                </NavLink>
                <NavLink to="/gallery" className={({isActive}) => isActive ? styles.active : styles.link}>
                    Gallery
                </NavLink>
            </nav>
        </header>
    )
}

export default NavBar