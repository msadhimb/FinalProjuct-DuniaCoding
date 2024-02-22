import React, { useEffect, useState } from "react";
import Wave1 from "../assets/wave1.svg";
import axios from "axios";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import Modal from "../components/Modal";
import ReactSelect from "react-select";

const Home = () => {
  const [pokemonAllData, setPokemonAllData] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [pokemonDetail, setPokemonDetail] = useState([]);

  const fetchData = async (search, currentPages) => {
    try {
      let url = `https://pokeapi.co/api/v2/pokemon?limit=6&offset=${
        (currentPages - 1) * 6
      }`;

      if (search) {
        url = `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`;
      }

      const response = await axios.get(url);

      if (!search) {
        const pokemonList = response.data.results;

        const pokemonDetails = await Promise.all(
          pokemonList.map(async (pokemon) => {
            try {
              const pokemonResponse = await axios.get(pokemon.url);
              return {
                ...pokemon,
                name: pokemon.name,
                image:
                  pokemonResponse.data.sprites.other["official-artwork"]
                    .front_default,
                url: pokemon.url,
                abilities: pokemonResponse.data.abilities,
                types: pokemonResponse.data.types,
              };
            } catch (error) {
              console.error("Error fetching pokemon data:", error);
              return null;
            }
          })
        );

        setPokemonData(pokemonDetails);
      } else {
        if (response.data.name) {
          setPokemonData([
            {
              ...response.data,
              name: response.data.name,
              image:
                response.data.sprites.other["official-artwork"].front_default,
              url: response.data.url,
              abilities: response.data.abilities,
              types: response.data.types,
            },
          ]);
          setNotFound(false);
        } else {
          setPokemonData([]);
          setNotFound(true);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchOptions = async () => {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
      const pokemonList = response.data.results;
      setPokemonAllData(pokemonList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDetail = async (url) => {
    setModalOpen(true);
    try {
      const response = await axios.get(url);
      setPokemonDetail(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.value);
  };

  useEffect(() => {
    fetchData(searchTerm, currentPage);
    fetchOptions();
  }, [currentPage, searchTerm]);

  return (
    <>
      <div className="w-full">
        <img
          src="https://wallpapers.com/images/hd/pikachu-4k-and-other-pokemons-ant5blc95axsagar.jpg"
          alt="Pokemons"
          className="w-50 h-50"
        />
        <img src={Wave1} alt="wave" className="mt-[-19rem]" />
        <h1 className="text-4xl text-center mt-[-4rem] font-semibold font-kodeMono">
          Find Your Pokemon Profile Here
        </h1>
        <div className="input-container w-full flex justify-center my-5 mb-[5rem]">
          <ReactSelect
            className=" w-1/2 p-2 rounded-md font-kodeMono"
            defaultValue={searchTerm}
            onChange={handleSearchChange}
            classNamePrefix="select"
            isClearable={true}
            name="pokeData"
            options={pokemonAllData.map((pokemon) => ({
              value: pokemon.name,
              label: pokemon.name,
            }))}
          />
        </div>

        <div className="container mx-auto grid grid-cols-3 gap-4 w-full">
          {notFound ? (
            <div className="col-span-3 text-center">
              Pokemon yang Anda cari belum ditemukan
            </div>
          ) : (
            pokemonData.map((pokemon, index) => (
              <div
                key={index}
                className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer hover:shadow-xl"
                onClick={() => handleDetail(pokemon.url)}
              >
                <img
                  className="w-full"
                  src={pokemon.image}
                  alt={pokemon.name}
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">
                    {pokemon.name.toUpperCase()}
                  </div>
                  <div className="flex items-center">
                    <p className="text-gray-700 text-base">Pokemon Type:</p>
                    {pokemon.types.map((type, index) => (
                      <span
                        key={index}
                        className="ml-3 bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
                      >
                        {type.type.name}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center flex-wrap mt-2">
                    <p className="text-gray-700 text-base">Abilities:</p>

                    {pokemon.abilities.map((abilities, index) => {
                      if (index <= 1) {
                        return (
                          <span
                            key={index}
                            className="ml-3 bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
                          >
                            {abilities.ability.name}
                          </span>
                        );
                      } else if (index >= 2) {
                        return (
                          <span
                            key={index}
                            className="ml-3 bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
                          >
                            ...
                          </span>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="flex justify-end container mx-auto my-5">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="mx-2 px-4 py-2 bg-purple-500 rounded-md text-white"
        >
          <FaAngleLeft />
        </button>
        <span className="mx-2 px-4 py-2  rounded-md">{currentPage}</span>
        <button
          onClick={handleNextPage}
          className="mx-2 px-4 py-2 bg-purple-500 rounded-md text-white"
        >
          <FaAngleRight />
        </button>
      </div>
      <Modal
        modalOpen={modalOpen}
        toggleModal={() => setModalOpen(!modalOpen)}
        data={pokemonDetail}
      />
    </>
  );
};

export default Home;
