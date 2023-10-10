import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { BrowserRouter as Router, NavLink, Route, Routes } from 'react-router-dom';

import ListCharacters from "./components/listCharacters";
import starWarsApi from "./services/api.service";
import CharacterView from "./components/viewDetails";

import ActivityIndicator from "../public/loading.gif";
import StarwarsLogo from "/logo_star_wars.png";
import "./App.css";

function App() {
  const [personagens, setPersonagens] = useState([]);
  const [loading, setLoading] = useState(false);

  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 3;
  const pagesVisited = pageNumber * usersPerPage;

  const displayUsers = personagens
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((personagem) => {
      return (
        <NavLink to={`/character/${personagem.name}`} style={{color: 'white'}}>
          <ListCharacters character={personagem} />
        </NavLink>
      )
    });

  const pageCount = Math.ceil(personagens.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const personagens = await starWarsApi.fetchAllCharacters();
        console.log("Retorno Api Personagens: ", personagens);
        setPersonagens(personagens.results);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <>
    <Router>
      <header>
        <a href="https://swapi.dev/" target="_blank">
          <img src={StarwarsLogo} className="logo react" alt="Star Wars Logo" />
        </a>
        <h1 className="fontCustom">Star Wars Characters</h1>
      </header>
      <main>
        {loading ? (
          <img height={50} src={ActivityIndicator} />
        ) : (
          <>
            <div className="card">{displayUsers}</div>
            <ReactPaginate
              previousLabel={"Prev"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"pagination"}
              previousLinkClassName={"previousBtn"}
              nextLinkClassName={"nextBtn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </>
        )}
        <Routes>
          <Route path="/character/:name" element={<CharacterView />} />
        </Routes>
      </main>
      </Router>
    </>
  );
}

export default App;
