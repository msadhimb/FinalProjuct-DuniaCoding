import React from "react";

const Card = (props) => {
  const { image, name, types, abilities, url, handleDetail } = props;
  return (
    <div
      className="rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl mx-auto w-64 md:w-[20rem] h-[25rem] md:h-full hover:scale-105 transition duration-300 ease-in-out"
      onClick={() => handleDetail(url)}
    >
      <img className="w-64 md:w-full mx-auto" src={image} alt={name} />
      <div className="px-6 py-4 text-sm md:text-base h-full">
        <div className="font-bold md:text-xl mb-2">{name.toUpperCase()}</div>
        <div className="flex items-center text-gray-700 dark:text-gray-300">
          <p className="text-gray-700 text-base">Pokemon Type:</p>
          {types.map((type, index) => (
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

          {abilities.map((abilities, index) => {
            if (index === 0) {
              return (
                <span
                  key={index}
                  className="ml-3 bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
                >
                  {abilities.ability.name}
                </span>
              );
            } else if (index <= 1) {
              return (
                <span
                  key={index}
                  className="ml-3 bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
                >
                  ...
                </span>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Card;
