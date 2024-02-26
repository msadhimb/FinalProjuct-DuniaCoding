import React, { useEffect, useState } from "react";
import Wave1 from "../assets/wave1.svg";
import axios from "axios";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import Modal from "../components/Modal";
import ReactSelect from "react-select";
import FlipCard from "../components/FlipCard";
import { MdElectricBolt, MdLocalFireDepartment } from "react-icons/md";
import Card from "../components/Card";

const Home = () => {
  const [pokemonAllData, setPokemonAllData] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
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
        } else {
          setPokemonData([]);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchOptions = async () => {
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=1118"
      );
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

  const handleSearchChange = (selectedOption) => {
    if (selectedOption) {
      setSearchTerm(selectedOption.value.toLowerCase());
    } else {
      setSearchTerm("");
    }
  };

  useEffect(() => {
    fetchData(searchTerm, currentPage);
    fetchOptions();
  }, [currentPage, searchTerm]);

  useEffect(() => {
    setPokemonDetail(pokemonData[0]);
  }, [pokemonData]);

  return (
    <>
      <div className="w-full">
        <div className="w-full relative">
          <img
            src="https://wallpapers.com/images/hd/pikachu-4k-and-other-pokemons-ant5blc95axsagar.jpg"
            alt="Pokemons"
            className="w-full object-cover object-center h-[25rem] md:h-[50rem] "
          />
          <div className="relative w-full">
            <img
              src={Wave1}
              alt="wave"
              className="absolute bottom-0 left-0 w-full max-w-full"
            />
          </div>
        </div>

        <div className="">
          <div className="h-auto">
            <h1 className="text-xl md:text-4xl text-center font-semibold font-kodeMono flex items-center justify-center z-10 ">
              Popular Pokemon
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 place-items-center align-middle mt-5 mb-14 w-full">
              <FlipCard
                img={`https://pngimg.com/uploads/pokemon/pokemon_PNG146.png`}
                backComponent={
                  <div className="relative h-full font-poppins font-bold">
                    <div
                      className="bg-purple-500 w-full h-full rounded-lg overflow-hidden absolute top-0"
                      style={{
                        clipPath: "polygon(0 0, 100% 20%, 100% 100%, 0 80%)",
                        backdropFilter: "blur(8px)", // Tambahkan backdrop-filter di sini
                      }}
                    ></div>

                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                      <MdElectricBolt className="w-24 h-24 " color="yellow" />
                      <h1 className="text-center">Pikachu</h1>
                    </div>
                  </div>
                }
              />
              <FlipCard
                img={`https://4.bp.blogspot.com/-q77mHftIxHE/VUEXgm5IWNI/AAAAAAAAADM/bxT8ds4gBT0/s1600/charmander.png`}
                backComponent={
                  <div className="relative h-full font-poppins font-bold">
                    <div
                      className="bg-blue-600 w-full h-full rounded-lg overflow-hidden absolute top-0"
                      style={{
                        clipPath: "polygon(0 0, 100% 20%, 100% 100%, 0 80%)",
                        backdropFilter: "blur(8px)", // Tambahkan backdrop-filter di sini
                      }}
                    ></div>

                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                      <MdLocalFireDepartment
                        className="w-24 h-24 "
                        color="orange"
                      />
                      <h1 className="text-center">Charmander</h1>
                    </div>
                  </div>
                }
              />

              <FlipCard
                img={`https://www.pokepedia.fr/images/8/8f/Ponyta-RFVF.png`}
                backComponent={
                  <div className="relative h-full font-poppins font-bold">
                    <div
                      className="bg-blue-600 w-full h-full rounded-lg overflow-hidden absolute top-0"
                      style={{
                        clipPath: "polygon(0 0, 100% 20%, 100% 100%, 0 80%)",
                        backdropFilter: "blur(8px)", // Tambahkan backdrop-filter di sini
                      }}
                    ></div>

                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                      <MdLocalFireDepartment
                        className="w-24 h-24 "
                        color="orange"
                      />
                      <h1 className="text-center">Ponyta</h1>
                    </div>
                  </div>
                }
              />
            </div>
          </div>
          <h1 className="text-xl md:text-4xl text-center font-semibold font-kodeMono flex items-center justify-center z-10 ">
            Find Your Pokemon Profile Here
          </h1>
          <div className="input-container w-full flex justify-center my-5 mb-[5rem]">
            <ReactSelect
              className="w-full md:w-1/2 p-2 rounded-md font-kodeMono"
              onChange={handleSearchChange}
              placeholder="Search Pokemon"
              classNamePrefix="select"
              isClearable={true}
              name="pokeData"
              options={pokemonAllData.map((pokemon) => ({
                value: pokemon.name,
                label: pokemon.name,
              }))}
            />
          </div>
        </div>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          {pokemonData.map((pokemon, index) => (
            <div key={index} className="w-full">
              <Card
                name={pokemon.name}
                image={pokemon.image}
                types={pokemon.types}
                url={pokemon.url}
                abilities={pokemon.abilities}
                handleDetail={handleDetail}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center container mx-auto my-5">
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
