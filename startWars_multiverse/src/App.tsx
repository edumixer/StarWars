import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import ListCharacters from "./components/listCharacters";
import starWarsApi from "./services/api.service";

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
      return <ListCharacters character={personagem} />;
    });

  const pageCount = Math.ceil(personagens.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const personagens = await starWarsApi.fetchData();
        console.log("ESOTU AQUI", personagens);
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
      <div>
        <a href="https://swapi.dev/" target="_blank">
          <img src={StarwarsLogo} className="logo react" alt="Star Wars Logo" />
        </a>
      </div>
      <h1 className="fontCustom">Star Wars Characters</h1>
      {loading ? (
        <img height={30} src={ActivityIndicator} />
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
    </>
  );
}

export default App;
