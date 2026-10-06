import {NavLink} from "react-router-dom";
import styles from './NavBar.module.css'

function NavBar() {
    return (
        <nav className={styles.nav}>
            <NavLink to="/" end className={({isActive}) => isActive ? styles.active : styles.link}>
                List
            </NavLink>
            <NavLink to="/gallery" className={({isActive}) => isActive ? styles.active : styles.link}>
                Gallery
            </NavLink>
        </nav>
    )
}

export default NavBar