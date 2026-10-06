//import { useEffect } from "react";
//import {fetchAllPokemonDetails} from "./api/pokeapi.ts";
import {Routes, Route} from "react-router-dom";
import {usePokemon} from "./context/pokemoncontext.ts";
import NavBar from "./components/NavBar.tsx";
import ListView from "./pages/ListView.tsx";
import GalleryView from "./pages/GalleryView.tsx";
import DetailView from "./pages/DetailView.tsx";

function App() {
    const {loading, error, reload} = usePokemon()
    return (
        <>
            <NavBar />
            <main>
                {loading && <p>Loading...</p>}
                {error && (
                    <div>
                        <p>{error}</p>
                        <button onClick={reload}>Please Try Again</button>
                    </div>
                )}
                {!loading && !error && (
                    <Routes>
                        <Route path="/" element={<ListView />} />
                        <Route path="/gallery" element={<GalleryView />} />
                        <Route path="/pokemon/:id" element={<DetailView />} />
                        <Route path="*" element={<p>Page Not Found.</p>} />
                    </Routes>
                )}
            </main>

        </>
    )
}

export default App
