import React from "react";
import { MdClose } from "react-icons/md";

const Modal = ({ modalOpen, toggleModal, data }) => {
  return (
    <>
      {modalOpen && (
        <div
          id="default-modal"
          className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 bg-black opacity-50 "
            onClick={toggleModal}
          ></div>

          <div className="relative p-4 mx-auto max-w-2xl w-full">
            <div className=" bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {data?.species?.name?.toUpperCase()}
                </h3>
                <button
                  onClick={toggleModal}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="default-modal"
                >
                  <MdClose />
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5 space-y-4 overflow-y-scroll h-[30rem]">
                <div className="w-full flex justify-center">
                  <img
                    src={
                      data?.sprites?.other["official-artwork"]?.front_default
                    }
                    alt="pokemon-pict"
                    className="w-25"
                  />
                </div>
                <div className="grid grid-cols-2">
                  <div>
                    <h4>Detail</h4>
                    <div className="flex flex-col">
                      <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                        Height: {data?.height} dm
                      </p>
                      <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                        Weight: {data?.weight} hg
                      </p>
                      <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                        Type:{" "}
                        {data?.types?.map((type, index) => {
                          if (index == data?.types?.length - 1) {
                            return <span key={index}>{type.type.name}.</span>;
                          } else {
                            return <span key={index}>{type.type.name}, </span>;
                          }
                        })}
                      </p>

                      <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                        Base Experience: {data?.base_experience}
                      </p>
                      <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                        Species: {data?.species?.name}
                      </p>
                      <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                        Abilities:{" "}
                        {data?.abilities?.map((abilities, index) => {
                          if (index == data?.abilities?.length - 1) {
                            return (
                              <span key={index}>{abilities.ability.name}.</span>
                            );
                          } else {
                            return (
                              <span key={index}>
                                {abilities.ability.name},{" "}
                              </span>
                            );
                          }
                        })}
                      </p>
                    </div>
                  </div>

                  <div>
                    {data?.stats?.map((stat, index) => (
                      <div className="my-2" key={index}>
                        <div className="flex justify-between ">
                          <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                            {stat.stat.name.toUpperCase()}
                          </p>
                          <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                            {stat.base_stat}%
                          </p>
                        </div>
                        <div className=" bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div
                            className="bg-purple-600 h-2.5 rounded-full"
                            style={{
                              width: `${Math.min(stat.base_stat, 100)}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
